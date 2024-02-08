import {Pool} from "pg";

const {
	POSTGRES_HOST,
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	POSTGRES_DATABASE,
	POSTGRES_TEST_DATABASE,
	POSTGRES_PORT
} = process.env;

const DATABASE =
	process.env.NODE_ENV === "test" ? POSTGRES_TEST_DATABASE : POSTGRES_DATABASE;

const pool = new Pool({
	host: POSTGRES_HOST as string,
	user: POSTGRES_USER as string,
	password: POSTGRES_PASSWORD as string,
	database: DATABASE as string,
	port: Number(POSTGRES_PORT as string)
});

class Db {
	static #INIT_QUERIES = [
		// Creating tables
		`
		CREATE TABLE IF NOT EXISTS users (
			id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
			username TEXT UNIQUE NOT NULL,
			email TEXT UNIQUE NOT NULL,
			password TEXT NOT NULL,
			avatar TEXT,
			github_connected BOOLEAN DEFAULT FALSE,
			created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
		);
		`,
		`
		CREATE TABLE IF NOT EXISTS github_connections (
			id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
			user_id INT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
			token TEXT NOT NULL,
			created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
		);
		`,
		`
		CREATE TABLE IF NOT EXISTS refresh_tokens (
			id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
			user_id INT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
			token TEXT NOT NULL,
			created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
		);
		`,
		`
		CREATE TABLE IF NOT EXISTS projects (
			id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
			owner_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
			name TEXT UNIQUE NOT NULL,
			description TEXT NOT NULL,
			repo_url TEXT NOT NULL,
			created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
		);
		`,
		`
		CREATE TABLE IF NOT EXISTS tags (
			id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
			name TEXT UNIQUE NOT NULL,
			created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
		);
		`,
		`
		CREATE TABLE IF NOT EXISTS custom_tags (
			id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
			project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
			name TEXT UNIQUE NOT NULL,
			created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
		);
		`,
		`
		CREATE TABLE IF NOT EXISTS projects_tags (
			id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
			project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
			tag_id INT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
			created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
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
		`
	];
	static #CLEANUP_QUERIES = [
		"TRUNCATE refresh_tokens RESTART IDENTITY CASCADE;",
		"TRUNCATE github_connections RESTART IDENTITY CASCADE;",
		"TRUNCATE users RESTART IDENTITY CASCADE;",
		"TRUNCATE projects RESTART IDENTITY CASCADE;"
	];

	static init() {
		return Db.#execTransaction(Db.#INIT_QUERIES);
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
