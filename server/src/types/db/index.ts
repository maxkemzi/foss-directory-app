interface ObjectFromDb {
	id: string;
	created_at: string;
	updated_at: string;
}

interface GithubConnectionFromDb extends ObjectFromDb {
	user_id: string;
	token: string;
}

interface ProjectFromDb extends ObjectFromDb {
	owner_id: string;
	name: string;
	description: string;
	repo_url: string;
}

interface ProjectTagFromDb extends ObjectFromDb {
	project_id: string;
	tag_id: string | null;
	name: string | null;
	is_custom: boolean;
}

interface ProjectRoleFromDb extends ObjectFromDb {
	project_id: string;
	places_available: number;
	role_id: string | null;
	name: string | null;
	is_custom: boolean;
}

interface ProjectRequestFromDb extends ObjectFromDb {
	requester_id: string;
	project_id: string;
	project_role_id: string;
}

interface RefreshTokenFromDb extends ObjectFromDb {
	user_id: string;
	token: string;
}

interface RoleFromDb extends ObjectFromDb {
	name: string;
}

interface TagFromDb extends ObjectFromDb {
	name: string;
}

interface UserFromDb extends ObjectFromDb {
	username: string;
	email: string;
	password: string;
	avatar: string | null;
	github_connected: boolean;
}

interface ProjectContributorFromDb extends ObjectFromDb {
	user_id: string;
	project_id: string;
	project_role_id: string;
	is_owner: boolean;
}

interface ProjectMessageFromDb extends ObjectFromDb {
	project_id: string;
	user_id: string | null;
	text: string;
	type: "regular" | "join";
}

export type {
	ObjectFromDb,
	GithubConnectionFromDb,
	ProjectFromDb,
	ProjectTagFromDb,
	ProjectRoleFromDb,
	ProjectRequestFromDb,
	RefreshTokenFromDb,
	RoleFromDb,
	TagFromDb,
	UserFromDb,
	ProjectContributorFromDb,
	ProjectMessageFromDb
};
