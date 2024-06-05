import {
	GithubConnectionFromDb,
	ProjectUserFromDb,
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
	userId: GithubConnectionFromDb["user_account_id"];
	token: GithubConnectionFromDb["token"];
}

interface ProjectPayload {
	ownerUserId: ProjectFromDb["owner_user_account_id"];
	name: ProjectFromDb["name"];
	description: ProjectFromDb["description"];
	repoUrl: ProjectFromDb["repo_url"];
	role: string;
	tags: string[];
	roles: {[name: string]: number};
}

interface ProjectRequestPayload {
	userId: ProjectRequestFromDb["user_account_id"];
	projectId: ProjectRequestFromDb["project_id"];
	projectRoleId: ProjectRequestFromDb["project_role_id"];
}

interface RefreshTokenPayload {
	userId: RefreshTokenFromDb["user_account_id"];
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

interface ProjectUserPayload {
	userId: ProjectUserFromDb["user_account_id"];
	projectId: ProjectUserFromDb["project_id"];
	projectRoleId: ProjectUserFromDb["project_role_id"];
}

interface ProjectMessagePayload {
	projectId: ProjectMessageFromDb["project_id"];
	userId: ProjectMessageFromDb["user_account_id"];
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
	ProjectUserPayload,
	ProjectMessagePayload
};
