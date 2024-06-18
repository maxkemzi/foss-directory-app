import {
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
} from "./rows";

interface PaginationArgs {
	search?: string;
	limit: number;
	offset: number;
}

interface GithubConnectionPayload {
	userId: GithubConnectionFromDb["user_account_id"];
	token: GithubConnectionFromDb["token"];
}

interface GithubRateLimitPayload {
	connectionId: GithubRateLimitFromDb["github_connection_id"];
	resource: GithubRateLimitFromDb["resource"];
	resetTime: GithubRateLimitFromDb["reset_time"];
}

interface ProjectPayload {
	ownerUserId: ProjectFromDb["owner_user_account_id"];
	name: ProjectFromDb["name"];
	description: ProjectFromDb["description"];
	repoUrl: ProjectFromDb["repo_url"];
}

interface BaseProjectMessagePayload {
	projectId: ProjectMessageFromDb["project_id"];
	isSequential: ProjectMessageFromDb["is_sequential"];
}

type RegularProjectMessagePayload = BaseProjectMessagePayload & {
	userId: NonNullable<ProjectMessageFromDb["user_account_id"]>;
	text: ProjectMessageFromDb["text"];
	type: "regular";
};

type JoinOrLeaveProjectMessagePayload = BaseProjectMessagePayload & {
	userId?: ProjectMessageFromDb["user_account_id"];
	text?: never;
	type: "join" | "leave";
};

type ProjectMessagePayload =
	| RegularProjectMessagePayload
	| JoinOrLeaveProjectMessagePayload;

interface ProjectUserPayload {
	userId: ProjectUserFromDb["user_account_id"];
	projectId: ProjectUserFromDb["project_id"];
	projectRoleId: ProjectUserFromDb["project_role_id"];
	isOwner?: ProjectUserFromDb["is_owner"];
}

interface ProjectRequestPayload {
	userId: ProjectRequestFromDb["user_account_id"];
	projectId: ProjectRequestFromDb["project_id"];
	projectRoleId: ProjectRequestFromDb["project_role_id"];
}

type ProjectRolePayload = {
	projectId: ProjectRoleFromDb["project_id"];
	placesAvailable?: ProjectRoleFromDb["places_available"];
} & (
	| {roleId: ProjectRoleFromDb["role_id"]; name?: never}
	| {name: ProjectRoleFromDb["name"]; roleId?: never}
);

type ProjectTagPayload = {
	projectId: ProjectTagFromDb["project_id"];
} & (
	| {tagId: ProjectTagFromDb["tag_id"]; name?: never}
	| {name: ProjectTagFromDb["name"]; tagId?: never}
);

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

export type {
	GithubConnectionPayload,
	PaginationArgs,
	GithubRateLimitPayload,
	ProjectMessagePayload,
	ProjectPayload,
	ProjectRequestPayload,
	ProjectRolePayload,
	ProjectTagPayload,
	ProjectUserPayload,
	RefreshTokenPayload,
	RolePayload,
	TagPayload,
	UserPayload
};
