import {
	GithubConnectionFromDb,
	ObjectFromDb,
	ProjectContributorFromDb,
	ProjectFromDb,
	ProjectRoleFromDb,
	ProjectRequestFromDb,
	ProjectTagFromDb,
	RefreshTokenFromDb,
	RoleFromDb,
	TagFromDb,
	UserFromDb
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
	userId: GithubConnectionFromDb["user_id"];
	token: GithubConnectionFromDb["token"];
}

interface ProjectDocument extends DocumentObject {
	ownerId: ProjectFromDb["owner_id"];
	name: ProjectFromDb["name"];
	description: ProjectFromDb["description"];
	repoUrl: ProjectFromDb["repo_url"];
}
interface PopulatedProjectDocument extends ProjectDocument {
	Owner: UserDocument;
	ProjectTags: PopulatedProjectTagDocument[];
	ProjectRoles: PopulatedProjectRoleDocument[];
}

interface ProjectTagDocument extends DocumentObject {
	projectId: ProjectTagFromDb["project_id"];
	tagId: ProjectTagFromDb["tag_id"];
}
interface PopulatedProjectTagDocument extends DocumentObject {
	Project: ProjectDocument;
	Tag: TagDocument;
}

interface ProjectRoleDocument extends DocumentObject {
	projectId: ProjectRoleFromDb["project_id"];
	roleId: ProjectRoleFromDb["role_id"];
	count: ProjectRoleFromDb["count"];
}
interface PopulatedProjectRoleDocument extends DocumentObject {
	Project: ProjectDocument;
	Role: RoleDocument;
	count: ProjectRoleFromDb["count"];
}

interface ProjectRequestDocument extends DocumentObject {
	requestorId: ProjectRequestFromDb["requestor_id"];
	projectRoleId: ProjectRequestFromDb["project_role_id"];
}
interface PopulatedProjectRequestDocument extends ProjectRequestDocument {
	Requestor: UserDocument;
	ProjectRole: PopulatedProjectRoleDocument;
}

interface RefreshTokenDocument extends DocumentObject {
	userId: RefreshTokenFromDb["user_id"];
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
	githubIsConnected: UserFromDb["github_connected"];
}

interface ProjectContributorDocument extends DocumentObject {
	projectId: ProjectContributorFromDb["project_id"];
	contributorId: ProjectContributorFromDb["contributor_id"];
}

export type {
	DocumentObject,
	DocumentImpl,
	GithubConnectionDocument,
	ProjectDocument,
	PopulatedProjectDocument,
	ProjectTagDocument,
	PopulatedProjectTagDocument,
	ProjectRoleDocument,
	PopulatedProjectRoleDocument,
	ProjectRequestDocument,
	PopulatedProjectRequestDocument,
	RefreshTokenDocument,
	RoleDocument,
	TagDocument,
	UserDocument,
	ProjectContributorDocument
};
