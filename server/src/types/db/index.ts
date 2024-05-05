interface ObjectFromDb {
	id: number;
	created_at: string;
	updated_at: string;
}

interface GithubConnectionFromDb extends ObjectFromDb {
	user_id: number;
	token: string;
}

interface ProjectFromDb extends ObjectFromDb {
	owner_id: number;
	name: string;
	description: string;
	repo_url: string;
}

interface ProjectTagFromDb extends ObjectFromDb {
	project_id: number;
	tag_id: number;
}

interface ProjectRoleFromDb extends ObjectFromDb {
	project_id: number;
	role_id: number;
	count: number;
}

interface ProjectRequestFromDb extends ObjectFromDb {
	requestor_id: number;
	project_role_id: number;
}

interface RefreshTokenFromDb extends ObjectFromDb {
	user_id: number;
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
	github_connected: boolean;
}

interface ProjectContributorFromDb extends ObjectFromDb {
	project_id: number;
	contributor_id: number;
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
	ProjectContributorFromDb
};
