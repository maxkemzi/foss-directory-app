import {
	GithubConnectionFromDb,
	ProjectContributorFromDb,
	ProjectFromDb,
	ProjectRequestFromDb,
	RefreshTokenFromDb,
	RoleFromDb,
	TagFromDb,
	UserFromDb
} from "..";

interface GithubConnectionPayload {
	userId: GithubConnectionFromDb["user_id"];
	token: GithubConnectionFromDb["token"];
}

interface ProjectPayload {
	ownerId: ProjectFromDb["owner_id"];
	name: ProjectFromDb["name"];
	description: ProjectFromDb["description"];
	repoUrl: ProjectFromDb["repo_url"];
	tags: string[];
	roles: {[name: string]: number};
}

interface ProjectRequestPayload {
	requestorId: ProjectRequestFromDb["requestor_id"];
	projectRoleId: ProjectRequestFromDb["project_role_id"];
}

interface RefreshTokenPayload {
	userId: RefreshTokenFromDb["user_id"];
	token: RefreshTokenFromDb["token"];
}

interface RolePayload {
	name: RoleFromDb["name"];
}

interface TagPayload {
	name: TagFromDb["name"];
}

interface UserPayload {
	username: UserFromDb["username"];
	email: UserFromDb["email"];
	password: UserFromDb["password"];
}

interface ProjectContributorPayload {
	projectId: ProjectContributorFromDb["project_id"];
	contributorId: ProjectContributorFromDb["contributor_id"];
}

interface PaginationArgs {
	search?: string;
	limit: number;
	offset: number;
}

export type {
	GithubConnectionPayload,
	ProjectPayload,
	ProjectRequestPayload,
	RefreshTokenPayload,
	RolePayload,
	TagPayload,
	UserPayload,
	ProjectContributorPayload,
	PaginationArgs
};
