interface RowFromDb {
	id: string;
	created_at: string;
	updated_at: string;
}

interface GithubConnectionFromDb extends RowFromDb {
	user_account_id: string;
	token: string;
}

interface GithubRateLimitFromDb extends RowFromDb {
	github_connection_id: string;
	resource: "core" | "search";
	reset_time: number;
}

interface ProjectFromDb extends RowFromDb {
	owner_user_account_id: string;
	name: string;
	description: string;
	repo_url: string;
}

interface ProjectMessageFromDb extends RowFromDb {
	project_id: string;
	user_account_id?: string | null;
	text: string;
	type: "regular" | "join" | "leave";
	is_sequential: boolean;
}

interface ProjectRequestFromDb extends RowFromDb {
	user_account_id: string;
	project_id: string;
	project_role_id: string;
}

interface ProjectRoleFromDb extends RowFromDb {
	project_id: string;
	places_available: number;
	role_id: string | null;
	name: string | null;
	is_custom: boolean;
}

interface ProjectTagFromDb extends RowFromDb {
	project_id: string;
	tag_id: string | null;
	name: string | null;
	is_custom: boolean;
}

interface ProjectUserFromDb extends RowFromDb {
	user_account_id: string;
	project_id: string;
	project_role_id: string;
	is_owner: boolean;
}

interface RefreshTokenFromDb extends RowFromDb {
	user_account_id: string;
	token: string;
}

interface RoleFromDb extends RowFromDb {
	name: string;
}

interface TagFromDb extends RowFromDb {
	name: string;
}

interface UserFromDb extends RowFromDb {
	username: string;
	email: string;
	password: string;
	avatar: string | null;
}

export type {
	RowFromDb,
	GithubConnectionFromDb,
	GithubRateLimitFromDb,
	ProjectFromDb,
	ProjectMessageFromDb,
	ProjectRequestFromDb,
	ProjectRoleFromDb,
	ProjectTagFromDb,
	ProjectUserFromDb,
	RefreshTokenFromDb,
	RoleFromDb,
	TagFromDb,
	UserFromDb
};
