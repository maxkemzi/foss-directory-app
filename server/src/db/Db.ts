import {Pool} from "pg";

const {
	POSTGRES_HOST,
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	POSTGRES_DATABASE,
	POSTGRES_PORT
} = process.env;

const pool = new Pool({
	host: POSTGRES_HOST as string,
	user: POSTGRES_USER as string,
	password: POSTGRES_PASSWORD as string,
	database: POSTGRES_DATABASE as string,
	port: Number(POSTGRES_PORT as string)
});

class Db {
	static #INIT_QUERIES = [
		// Creating tables
		`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`,
		`
		CREATE TABLE IF NOT EXISTS users (
			id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
			username TEXT UNIQUE NOT NULL,
			email TEXT UNIQUE NOT NULL,
			password TEXT NOT NULL,
			avatar TEXT,
			github_connected BOOLEAN NOT NULL DEFAULT FALSE,
			created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
		);
		`,
		`
		CREATE TABLE IF NOT EXISTS github_connections (
			id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
			user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
			token TEXT NOT NULL,
			created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
		);
		`,
		`
		CREATE TABLE IF NOT EXISTS refresh_tokens (
			id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
			user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
			token TEXT NOT NULL,
			created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
		);
		`,
		`
		CREATE TABLE IF NOT EXISTS projects (
			id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
			owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
			name TEXT NOT NULL,
			description TEXT NOT NULL,
			repo_url TEXT NOT NULL,
			created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
		);
		`,
		`
		CREATE TABLE IF NOT EXISTS tags (
			id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
			name TEXT UNIQUE NOT NULL,
			created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
		);
		`,
		`
		CREATE TABLE IF NOT EXISTS projects_tags (
			id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
			project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
			tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
			name TEXT,
			is_custom BOOLEAN NOT NULL,
			created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
		);
		`,
		`
		CREATE TABLE IF NOT EXISTS roles (
			id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
			name TEXT UNIQUE NOT NULL,
			created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
		);
		`,
		`
		CREATE TABLE IF NOT EXISTS projects_roles (
			id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
			project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
			role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
			name TEXT,
			is_custom BOOLEAN NOT NULL,
			places_available INT NOT NULL DEFAULT 0,
			created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
			UNIQUE(project_id, role_id)
		);
		`,
		`
		CREATE TABLE IF NOT EXISTS projects_contributors (
			id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
			user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
			project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
			project_role_id UUID NOT NULL REFERENCES projects_roles(id) ON DELETE CASCADE,
			is_owner BOOLEAN NOT NULL DEFAULT FALSE,
			created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
			UNIQUE(user_id, project_role_id)
		);

		CREATE OR REPLACE FUNCTION check_places_available()
		RETURNS TRIGGER AS $$
		BEGIN
			IF NOT NEW.is_owner THEN
				IF EXISTS (
					SELECT 1
					FROM projects_roles
					WHERE id = NEW.project_role_id AND places_available = 0
				) THEN
					RAISE EXCEPTION 'Cannot insert into projects_contributors because places_available is 0 for the corresponding project_role_id';
				END IF;
			END IF;

			RETURN NEW;
		END;
		$$ LANGUAGE plpgsql;
		CREATE OR REPLACE TRIGGER projects_contributors_before_insert
		BEFORE INSERT ON projects_contributors
		FOR EACH ROW
		EXECUTE FUNCTION check_places_available();
		
		CREATE OR REPLACE FUNCTION decrement_places_available()
		RETURNS TRIGGER AS $$
		BEGIN
			UPDATE projects_roles
			SET places_available = places_available - 1
			WHERE id = NEW.project_role_id;

			RETURN NEW;
		END;
		$$ LANGUAGE plpgsql;
		CREATE OR REPLACE TRIGGER projects_contributors_after_insert
		AFTER INSERT ON projects_contributors
		FOR EACH ROW
		EXECUTE FUNCTION decrement_places_available();

		CREATE OR REPLACE FUNCTION increment_places_available()
		RETURNS TRIGGER AS $$
		BEGIN
			UPDATE projects_roles
			SET places_available = places_available + 1
			WHERE id = OLD.project_role_id;

			RETURN OLD;
		END;
		$$ LANGUAGE plpgsql;
		CREATE OR REPLACE TRIGGER projects_contributors_after_delete
		AFTER DELETE ON projects_contributors
		FOR EACH ROW
		EXECUTE FUNCTION increment_places_available();
		`,
		`
		CREATE TABLE IF NOT EXISTS projects_requests (
			id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
			requester_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
			project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
			project_role_id UUID NOT NULL REFERENCES projects_roles(id) ON DELETE CASCADE,
			created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
			UNIQUE(requester_id, project_role_id)
		);
		`,
		`
		CREATE TABLE IF NOT EXISTS projects_messages (
			id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
			project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
			sender_id UUID NOT NULL REFERENCES projects_contributors(id) ON DELETE CASCADE,
			text TEXT NOT NULL,
			created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
		);
		`,
		// Create triggers for github_connected column
		`
		CREATE OR REPLACE FUNCTION update_github_connected()
		RETURNS TRIGGER AS $$
		BEGIN
				UPDATE users
				SET github_connected = TRUE
				WHERE id = NEW.user_id;
		
				RETURN NEW;
		END;
		$$ LANGUAGE plpgsql;
		`,
		`
		CREATE OR REPLACE TRIGGER github_connections_after_insert
		AFTER INSERT ON github_connections
		FOR EACH ROW
		EXECUTE FUNCTION update_github_connected();
		`,
		`
		CREATE OR REPLACE FUNCTION update_github_disconnected()
		RETURNS TRIGGER AS $$
		BEGIN
				UPDATE users
				SET github_connected = FALSE
				WHERE id = OLD.user_id;
		
				RETURN OLD;
		END;
		$$ LANGUAGE plpgsql;
		`,
		`
		CREATE OR REPLACE TRIGGER github_connections_after_delete
		AFTER DELETE ON github_connections
		FOR EACH ROW
		EXECUTE FUNCTION update_github_disconnected();
		`,
		// Setting up automatic updated_at timestamp
		`
		CREATE OR REPLACE FUNCTION update_updated_at()
		RETURNS TRIGGER AS $$
		BEGIN
				NEW.updated_at = NOW();
				RETURN NEW;
		END;
		$$ LANGUAGE plpgsql;
		`,
		`
		CREATE OR REPLACE TRIGGER users_updated_at
		BEFORE UPDATE ON users
		FOR EACH ROW
		EXECUTE FUNCTION update_updated_at();
		`,
		`
		CREATE OR REPLACE TRIGGER github_connections_updated_at
		BEFORE UPDATE ON github_connections
		FOR EACH ROW
		EXECUTE FUNCTION update_updated_at();
		`,
		`
		CREATE OR REPLACE TRIGGER refresh_tokens_updated_at
		BEFORE UPDATE ON refresh_tokens
		FOR EACH ROW
		EXECUTE FUNCTION update_updated_at();
		`,
		`
		CREATE OR REPLACE TRIGGER projects_updated_at
		BEFORE UPDATE ON projects
		FOR EACH ROW
		EXECUTE FUNCTION update_updated_at();
		`,
		`
		CREATE OR REPLACE TRIGGER tags_updated_at
		BEFORE UPDATE ON tags
		FOR EACH ROW
		EXECUTE FUNCTION update_updated_at();
		`,
		`
		CREATE OR REPLACE TRIGGER projects_tags_updated_at
		BEFORE UPDATE ON projects_tags
		FOR EACH ROW
		EXECUTE FUNCTION update_updated_at();
		`,
		`
		CREATE OR REPLACE TRIGGER roles_updated_at
		BEFORE UPDATE ON roles
		FOR EACH ROW
		EXECUTE FUNCTION update_updated_at();
		`,
		`
		CREATE OR REPLACE TRIGGER projects_roles_updated_at
		BEFORE UPDATE ON projects_roles
		FOR EACH ROW
		EXECUTE FUNCTION update_updated_at();
		`,
		`
		CREATE OR REPLACE TRIGGER projects_contributors_updated_at
		BEFORE UPDATE ON projects_contributors
		FOR EACH ROW
		EXECUTE FUNCTION update_updated_at();
		`,
		`
		CREATE OR REPLACE TRIGGER projects_requests_updated_at
		BEFORE UPDATE ON projects_requests
		FOR EACH ROW
		EXECUTE FUNCTION update_updated_at();
		`,
		`
		CREATE OR REPLACE TRIGGER projects_messages_updated_at
		BEFORE UPDATE ON projects_messages
		FOR EACH ROW
		EXECUTE FUNCTION update_updated_at();
		`
	];
	static #POPULATE_QUERIES = [
		"INSERT INTO tags(name) VALUES ('Typescript'), ('CSS'), ('HTML'), ('Next.js'), ('C#'), ('C++'), ('Java'), ('TailwindCSS');",
		"INSERT INTO roles(name) VALUES ('Designer'), ('Software engineer'), ('Manager'), ('Tester'), ('Backend developer'), ('Frontend developer'), ('Fullstack developer');"
	];
	static #CLEANUP_QUERIES = [
		"TRUNCATE refresh_tokens RESTART IDENTITY CASCADE;",
		"TRUNCATE github_connections RESTART IDENTITY CASCADE;",
		"TRUNCATE users RESTART IDENTITY CASCADE;",
		"TRUNCATE projects RESTART IDENTITY CASCADE;",
		"TRUNCATE tag RESTART IDENTITY CASCADE;",
		"TRUNCATE role RESTART IDENTITY CASCADE;"
	];

	static init() {
		return Db.#execTransaction(Db.#INIT_QUERIES);
	}

	static populate() {
		return Db.#execTransaction(Db.#POPULATE_QUERIES);
	}

	static cleanUp() {
		return Db.#execTransaction(Db.#CLEANUP_QUERIES);
	}

	static async #execTransaction(queries: string[]) {
		const client = await pool.connect();

		try {
			await client.query("BEGIN");

			// eslint-disable-next-line no-restricted-syntax
			for (const query of queries) {
				// eslint-disable-next-line no-await-in-loop
				await client.query(query);
			}

			await client.query("COMMIT");
		} catch (e) {
			await client.query("ROLLBACK");
			throw e;
		} finally {
			client.release();
		}
	}

	static query<T extends object>(text: string, params?: any) {
		return pool.query<T>(text, params);
	}

	static connect() {
		return pool.connect();
	}
}

export default Db;
