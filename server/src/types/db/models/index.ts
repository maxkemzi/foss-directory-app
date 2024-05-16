import {
	GithubConnectionFromDb,
	ProjectContributorFromDb,
	ProjectFromDb,
	ProjectMessageFromDb,
	ProjectRequestFromDb,
	RefreshTokenFromDb,
	RoleFromDb,
	TagFromDb,
	UserFromDb
} from "..";

interface PaginationArgs {
	search?: string;
	limit: number;
	offset: number;
}

interface GithubConnectionPayload {
	userId: GithubConnectionFromDb["user_id"];
	token: GithubConnectionFromDb["token"];
}

interface ProjectPayload {
	ownerId: ProjectFromDb["owner_id"];
	name: ProjectFromDb["name"];
	description: ProjectFromDb["description"];
	repoUrl: ProjectFromDb["repo_url"];
	role: string;
	tags: string[];
	roles: {[name: string]: number};
}

interface ProjectRequestPayload {
	requesterId: ProjectRequestFromDb["requester_id"];
	projectId: ProjectContributorFromDb["project_id"];
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
	avatar?: UserFromDb["avatar"];
	password: UserFromDb["password"];
}

interface ProjectContributorPayload {
	userId: ProjectContributorFromDb["user_id"];
	projectId: ProjectContributorFromDb["project_id"];
	projectRoleId: ProjectContributorFromDb["project_role_id"];
}

interface ProjectMessagePayload {
	projectId: ProjectMessageFromDb["project_id"];
	userId: ProjectMessageFromDb["user_id"];
	text: ProjectMessageFromDb["text"];
	type: ProjectMessageFromDb["type"];
}

export type {
	PaginationArgs,
	GithubConnectionPayload,
	ProjectPayload,
	ProjectRequestPayload,
	RefreshTokenPayload,
	RolePayload,
	TagPayload,
	UserPayload,
	ProjectContributorPayload,
	ProjectMessagePayload
};
