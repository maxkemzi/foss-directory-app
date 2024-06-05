import {
	GithubConnectionFromDb,
	ObjectFromDb,
	ProjectFromDb,
	ProjectRequestFromDb,
	RefreshTokenFromDb,
	ProjectUserFromDb,
	ProjectMessageFromDb,
	RoleFromDb,
	TagFromDb,
	UserFromDb,
	ProjectTagFromDb
} from "..";

interface DocumentObject {
	id: ObjectFromDb["id"];
	createdAt: ObjectFromDb["created_at"];
	updatedAt: ObjectFromDb["updated_at"];
}
type DocumentImpl<T extends DocumentObject> = T & {
	toObject(): T;
};

interface GithubConnectionDocument extends DocumentObject {
	userId: GithubConnectionFromDb["user_account_id"];
	token: GithubConnectionFromDb["token"];
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
	tags: TagDocument[];
	roles: (RoleDocument & {
		placesAvailable: ProjectRoleDocument["placesAvailable"];
	})[];
	requestable: boolean;
	userCount: number;
}

interface ProjectTagDocument extends DocumentObject {
	projectId: ProjectTagFromDb["project_id"];
	tagId: ProjectTagFromDb["tag_id"];
	name: ProjectTagFromDb["name"];
	isCustom: ProjectTagFromDb["is_custom"];
}
type PopulatedProjectTagDocument = DocumentObject & {
	Project: ProjectDocument;
	name: ProjectTagFromDb["name"];
	isCustom: ProjectTagFromDb["is_custom"];
} & ({tagId: null} | {Tag: TagDocument; tagId: string});

interface ProjectRoleDocument extends DocumentObject {
	projectId: string;
	placesAvailable: number;
	roleId: string | null;
	name: string | null;
	isCustom: boolean;
}
type PopulatedProjectRoleDocument = DocumentObject & {
	Project: ProjectDocument;
	placesAvailable: number;
	name: string;
	isCustom: false;
} & (
		| {Role: never; role_id: null}
		| {Role: ProjectRoleDocument; role_id: never}
	);

interface ProjectRequestDocument extends DocumentObject {
	userId: ProjectRequestFromDb["user_account_id"];
	projectId: ProjectRequestFromDb["project_id"];
	projectRoleId: ProjectRequestFromDb["project_role_id"];
}
interface PopulatedProjectRequestDocument extends DocumentObject {
	user: UserDocument;
	project: ProjectDocument;
	role: RoleDocument & {
		placesAvailable: ProjectRoleDocument["placesAvailable"];
	};
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
	githubIsConnected: UserFromDb["github_connected"];
}

interface ProjectUserDocument extends DocumentObject {
	userId: ProjectUserFromDb["user_account_id"];
	projectId: ProjectUserFromDb["project_id"];
	projectRoleId: ProjectUserFromDb["project_role_id"];
	isOwner: ProjectUserFromDb["is_owner"];
}
interface PopulatedProjectUserDocument extends DocumentObject {
	user: UserDocument;
	role: RoleDocument;
	isOwner: boolean;
}

interface ProjectMessageDocument extends DocumentObject {
	projectId: ProjectMessageFromDb["project_id"];
	userId: ProjectMessageFromDb["user_account_id"];
	text: ProjectMessageFromDb["text"];
	type: ProjectMessageFromDb["type"];
}
interface PopulatedProjectMessageDocument extends DocumentObject {
	project: ProjectDocument;
	sender: {
		user: UserDocument;
		role: RoleDocument | null;
		isOwner: boolean;
	} | null;
	text: ProjectMessageFromDb["text"];
	type: ProjectMessageFromDb["type"];
}

export type {
	ProjectUserDocument,
	DocumentImpl,
	DocumentObject,
	GithubConnectionDocument,
	ProjectMessageDocument,
	PopulatedProjectMessageDocument,
	PopulatedProjectDocument,
	PopulatedProjectRoleDocument,
	PopulatedProjectRequestDocument,
	PopulatedProjectUserDocument,
	ProjectDocument,
	ProjectRoleDocument,
	ProjectTagDocument,
	PopulatedProjectTagDocument,
	RefreshTokenDocument,
	ProjectRequestDocument,
	RoleDocument,
	TagDocument,
	UserDocument
};
