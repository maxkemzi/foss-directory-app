interface ProjectFromApi {
	id: number;
	name: string;
	description: string;
	repoUrl: string;
	Owner: {id: number; username: string};
	ProjectTags: {id: number; Tag: {id: number; name: string}}[];
	ProjectRoles: {id: number; count: number; Role: {name: string}}[];
}

interface TagFromApi {
	id: number;
	name: string;
}

interface RoleFromApi {
	id: number;
	name: string;
}

interface UserFromApi {
	id: number;
	username: string;
	email: string;
	githubIsConnected: boolean;
}

interface RepoFromApi {
	id: number;
	name: string;
	description: string;
	url: string;
	topics: string[];
}

interface RoleRequestFromApi {
	id: number;
	requestorId: number;
	projectRoleId: number;
	Requestor: {
		id: number;
		username: string;
	};
	ProjectRole: {
		id: number;
		Project: {
			id: number;
			name: string;
		};
		Role: {
			id: number;
			name: string;
		};
	};
}

export type {
	ProjectFromApi,
	TagFromApi,
	UserFromApi,
	RepoFromApi,
	RoleFromApi,
	RoleRequestFromApi
};
