import {PoolClient} from "pg";
import {
	GithubConnectionFromDb,
	GithubRateLimitFromDb,
	ProjectFromDb,
	ProjectMessageFromDb,
	ProjectRequestFromDb,
	ProjectRoleFromDb,
	ProjectTagFromDb,
	ProjectUserFromDb,
	RateLimitFromDb,
	RefreshTokenFromDb,
	RoleFromDb,
	RowFromDb,
	TagFromDb,
	UserFromDb
} from "./rows";

interface DocumentObject {
	id: RowFromDb["id"];
	createdAt: RowFromDb["created_at"];
	updatedAt: RowFromDb["updated_at"];
}

interface PopulatableDocument<PopulatedDocument extends DocumentObject> {
	populate(client: PoolClient): Promise<PopulatedDocument>;
}

interface GithubConnectionDocument extends DocumentObject {
	userId: GithubConnectionFromDb["user_account_id"];
	token: GithubConnectionFromDb["token"];
}

interface GithubRateLimitDocument extends DocumentObject {
	connectionId: GithubRateLimitFromDb["github_connection_id"];
	resource: GithubRateLimitFromDb["resource"];
	resetTime: GithubRateLimitFromDb["reset_time"];
}

interface BaseProjectDocument extends DocumentObject {
	name: ProjectFromDb["name"];
	description: ProjectFromDb["description"];
	repoUrl: ProjectFromDb["repo_url"];
}
interface ProjectDocument extends BaseProjectDocument {
	ownerUserId: ProjectFromDb["owner_user_account_id"];
}
interface PopulatedProjectDocument extends BaseProjectDocument {
	ownerUser: UserDocument;
	tags: PopulatedProjectTagDocument[];
	roles: PopulatedProjectRoleDocument[];
}

interface ProjectTagDocument extends DocumentObject {
	projectId: ProjectTagFromDb["project_id"];
	tagId: ProjectTagFromDb["tag_id"];
	name: ProjectTagFromDb["name"];
	isCustom: ProjectTagFromDb["is_custom"];
}
type PopulatedProjectTagDocument = DocumentObject & {
	id: ProjectTagFromDb["id"];
	name: ProjectTagFromDb["name"];
};

interface ProjectRoleDocument extends DocumentObject {
	projectId: ProjectRoleFromDb["project_id"];
	placesAvailable: ProjectRoleFromDb["places_available"];
	roleId: ProjectRoleFromDb["role_id"];
	name: ProjectRoleFromDb["name"];
	isCustom: ProjectRoleFromDb["is_custom"];
}
type PopulatedProjectRoleDocument = DocumentObject & {
	id: ProjectRoleFromDb["id"];
	name: ProjectRoleFromDb["name"];
	placesAvailable: ProjectRoleFromDb["places_available"];
};

interface ProjectRequestDocument extends DocumentObject {
	userId: ProjectRequestFromDb["user_account_id"];
	projectId: ProjectRequestFromDb["project_id"];
	projectRoleId: ProjectRequestFromDb["project_role_id"];
}
interface PopulatedProjectRequestDocument extends DocumentObject {
	user: UserDocument;
	project: ProjectDocument;
	role: PopulatedProjectRoleDocument;
}

interface RefreshTokenDocument extends DocumentObject {
	userId: RefreshTokenFromDb["user_account_id"];
	token: RefreshTokenFromDb["token"];
}

interface RoleDocument extends DocumentObject {
	name: RoleFromDb["name"];
}

interface TagDocument extends DocumentObject {
	name: TagFromDb["name"];
}

interface UserDocument extends DocumentObject {
	username: UserFromDb["username"];
	email: UserFromDb["email"];
	password: UserFromDb["password"];
	avatar: UserFromDb["avatar"];
}

interface RateLimitDocument extends DocumentObject {
	userId: RateLimitFromDb["user_id"];
	ip: RateLimitFromDb["ip"];
	requestCount: RateLimitFromDb["request_count"];
	resetTime: RateLimitFromDb["reset_time"];
}

interface ProjectUserDocument extends DocumentObject {
	userId: ProjectUserFromDb["user_account_id"];
	projectId: ProjectUserFromDb["project_id"];
	projectRoleId: ProjectUserFromDb["project_role_id"];
	isOwner: ProjectUserFromDb["is_owner"];
}
interface PopulatedProjectUserDocument extends DocumentObject {
	user: UserDocument;
	role: PopulatedProjectRoleDocument;
	isOwner: boolean;
}

interface ProjectMessageDocument extends DocumentObject {
	projectId: ProjectMessageFromDb["project_id"];
	userId: ProjectMessageFromDb["user_account_id"];
	text: ProjectMessageFromDb["text"];
	type: ProjectMessageFromDb["type"];
	isSequential: ProjectMessageFromDb["is_sequential"];
}
interface PopulatedProjectMessageDocument extends DocumentObject {
	project: ProjectDocument;
	sender: {
		user: UserDocument;
		role: PopulatedProjectRoleDocument | null;
		isOwner: boolean;
	} | null;
	text: ProjectMessageFromDb["text"];
	type: ProjectMessageFromDb["type"];
	isSequential: ProjectMessageFromDb["is_sequential"];
}

export type {
	DocumentObject,
	GithubConnectionDocument,
	GithubRateLimitDocument,
	PopulatableDocument,
	PopulatedProjectDocument,
	PopulatedProjectMessageDocument,
	PopulatedProjectRequestDocument,
	PopulatedProjectRoleDocument,
	PopulatedProjectTagDocument,
	PopulatedProjectUserDocument,
	ProjectDocument,
	ProjectMessageDocument,
	ProjectRequestDocument,
	ProjectRoleDocument,
	ProjectTagDocument,
	ProjectUserDocument,
	RateLimitDocument,
	RefreshTokenDocument,
	RoleDocument,
	TagDocument,
	UserDocument
};
