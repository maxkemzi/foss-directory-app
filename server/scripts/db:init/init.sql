CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS user_account (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	serial_id BIGSERIAL,
	username TEXT UNIQUE NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL,
	avatar TEXT,
	github_connected BOOLEAN NOT NULL DEFAULT FALSE,
	created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS github_connection (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	serial_id BIGSERIAL,
	user_account_id UUID UNIQUE NOT NULL REFERENCES user_account(id) ON DELETE CASCADE,
	token TEXT NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS refresh_token (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	serial_id BIGSERIAL,
	user_account_id UUID UNIQUE NOT NULL REFERENCES user_account(id) ON DELETE CASCADE,
	token TEXT NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS project (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	serial_id BIGSERIAL,
	owner_user_account_id UUID NOT NULL REFERENCES user_account(id) ON DELETE CASCADE,
	name TEXT NOT NULL,
	description TEXT NOT NULL,
	repo_url TEXT NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tag (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	serial_id BIGSERIAL,
	name TEXT UNIQUE NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS project_tags (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	serial_id BIGSERIAL,
	project_id UUID NOT NULL REFERENCES project(id) ON DELETE CASCADE,
	tag_id UUID REFERENCES tag(id) ON DELETE CASCADE,
	name TEXT,
	is_custom BOOLEAN NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS role (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	serial_id BIGSERIAL,
	name TEXT UNIQUE NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS project_roles (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	serial_id BIGSERIAL,
	project_id UUID NOT NULL REFERENCES project(id) ON DELETE CASCADE,
	role_id UUID REFERENCES role(id) ON DELETE CASCADE,
	name TEXT,
	is_custom BOOLEAN NOT NULL,
	places_available INT NOT NULL DEFAULT 0,
	created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	UNIQUE(project_id, role_id)
);

CREATE TABLE IF NOT EXISTS project_user_accounts (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	serial_id BIGSERIAL,
	user_account_id UUID NOT NULL REFERENCES user_account(id) ON DELETE CASCADE,
	project_id UUID NOT NULL REFERENCES project(id) ON DELETE CASCADE,
	project_role_id UUID NOT NULL REFERENCES project_roles(id) ON DELETE CASCADE,
	is_owner BOOLEAN NOT NULL DEFAULT FALSE,
	created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	UNIQUE(user_account_id, project_id)
);

CREATE TABLE IF NOT EXISTS project_requests (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	serial_id BIGSERIAL,
	user_account_id UUID NOT NULL REFERENCES user_account(id) ON DELETE CASCADE,
	project_id UUID NOT NULL REFERENCES project(id) ON DELETE CASCADE,
	project_role_id UUID NOT NULL REFERENCES project_roles(id) ON DELETE CASCADE,
	created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	UNIQUE(user_account_id, project_role_id)
);

DO $$ BEGIN
	CREATE TYPE MESSAGE_TYPE AS ENUM ('regular', 'join', 'leave', 'date');
EXCEPTION
	WHEN duplicate_object THEN null;
END $$;
CREATE TABLE IF NOT EXISTS project_messages (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	serial_id BIGSERIAL,
	project_id UUID NOT NULL REFERENCES project(id) ON DELETE CASCADE,
	user_account_id UUID REFERENCES user_account(id) ON DELETE SET NULL,
	text TEXT DEFAULT NULL,
	type MESSAGE_TYPE,
	created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- github_connection triggers

CREATE OR REPLACE FUNCTION github_connection_after_insert()
RETURNS TRIGGER AS $$
BEGIN
	UPDATE user_account
	SET github_connected = TRUE
	WHERE id = NEW.user_account_id;

	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER github_connection_after_insert
AFTER INSERT ON github_connection
FOR EACH ROW
EXECUTE FUNCTION github_connection_after_insert();

CREATE OR REPLACE FUNCTION github_connection_after_delete()
RETURNS TRIGGER AS $$
BEGIN
	IF (NOT EXISTS (SELECT 1 FROM user_account WHERE id = OLD.user_account_id)) THEN
		RETURN OLD;
	END IF;

	UPDATE user_account
	SET github_connected = FALSE
	WHERE id = OLD.user_account_id;

	RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER github_connection_after_delete
AFTER DELETE ON github_connection
FOR EACH ROW
EXECUTE FUNCTION github_connection_after_delete();

-- project_user_accounts triggers

CREATE OR REPLACE FUNCTION project_user_accounts_before_insert()
RETURNS TRIGGER AS $$
BEGIN
	IF (NOT NEW.is_owner AND EXISTS (
		SELECT 1
		FROM project_roles
		WHERE id = NEW.project_role_id AND places_available = 0
	)) THEN
		RAISE EXCEPTION 'Cannot insert into project_user_accounts because places_available is 0 for the corresponding project_role_id';
	END IF;

	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER project_user_accounts_before_insert
BEFORE INSERT ON project_user_accounts
FOR EACH ROW
EXECUTE FUNCTION project_user_accounts_before_insert();

CREATE OR REPLACE FUNCTION project_user_accounts_after_insert()
RETURNS TRIGGER AS $$
BEGIN
	IF (NEW.is_owner) THEN
		RETURN NEW;
	END IF;

	UPDATE project_roles
	SET places_available = places_available - 1
	WHERE id = NEW.project_role_id;

	INSERT INTO project_messages (project_id, user_account_id, type)
	VALUES (NEW.project_id, NEW.user_account_id, 'join');

	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER project_user_accounts_after_insert
AFTER INSERT ON project_user_accounts
FOR EACH ROW
EXECUTE FUNCTION project_user_accounts_after_insert();

CREATE OR REPLACE FUNCTION project_user_accounts_after_delete()
RETURNS TRIGGER AS $$
BEGIN
	IF (NOT EXISTS (SELECT 1 FROM project WHERE id = OLD.project_id)) THEN
		RETURN OLD;
	END IF;

	IF NOT EXISTS (SELECT 1 FROM user_account WHERE id = OLD.user_account_id) THEN
    OLD.user_account_id := NULL;
  END IF;

	IF (OLD.is_owner) THEN
		DELETE FROM project WHERE id = OLD.project_id;
	ELSE
		UPDATE project_roles
		SET places_available = places_available + 1
		WHERE id = OLD.project_role_id;

		INSERT INTO project_messages (project_id, user_account_id, type)
		VALUES (OLD.project_id, OLD.user_account_id, 'leave');
	END IF;

	RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER project_user_accounts_after_delete
AFTER DELETE ON project_user_accounts
FOR EACH ROW
EXECUTE FUNCTION project_user_accounts_after_delete();

-- project_messages triggers

CREATE OR REPLACE FUNCTION project_messages_after_insert()
RETURNS TRIGGER AS $$
BEGIN
	PERFORM pg_notify('project_message_insert_notification', NEW.id::text);

	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER project_messages_after_insert
AFTER INSERT ON project_messages
FOR EACH ROW
EXECUTE FUNCTION project_messages_after_insert();

-- update_at column triggers

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
		NEW.updated_at = NOW();
		RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER user_account_updated_at
BEFORE UPDATE ON user_account
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER github_connection_updated_at
BEFORE UPDATE ON github_connection
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER refresh_token_updated_at
BEFORE UPDATE ON refresh_token
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER project_updated_at
BEFORE UPDATE ON project
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER tag_updated_at
BEFORE UPDATE ON tag
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER project_tags_updated_at
BEFORE UPDATE ON project_tags
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER role_updated_at
BEFORE UPDATE ON role
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER project_roles_updated_at
BEFORE UPDATE ON project_roles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER project_user_accounts_updated_at
BEFORE UPDATE ON project_user_accounts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER project_requests_updated_at
BEFORE UPDATE ON project_requests
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER project_messages_updated_at
BEFORE UPDATE ON project_messages
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();
