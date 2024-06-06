interface ProjectFromApi {
	id: string;
	name: string;
	description: string;
	repoUrl: string;
	ownerUser: {id: string; username: string};
	tags: {id: string; name: string}[];
	roles: {id: string; name: string; placesAvailable: number}[];
	requestable: boolean;
	userCount: number;
}

interface TagFromApi {
	id: string;
	name: string;
}

interface RoleFromApi {
	id: string;
	name: string;
}

interface UserFromApi {
	id: string;
	username: string;
	email: string;
	avatar: string | null;
	githubIsConnected: boolean;
}

interface RepoFromApi {
	id: number;
	name: string;
	description: string;
	url: string;
	topics: string[];
}

interface ProjectRequestFromApi {
	id: string;
	user: {
		id: string;
		username: string;
	};
	project: {
		id: string;
		name: string;
	};
	role: {
		id: string;
		name: string;
	};
}

interface ProjectUserFromApi {
	id: string;
	user: {
		id: string;
		username: string;
		avatar: string;
	};
	role: {id: string; name: string};
	isOwner: boolean;
}

interface ProjectChatFromApi {
	projectId: string;
	name: string;
	userCount: number;
	ownerUser: {id: string};
}

interface ProjectChatMessageFromApi {
	id: string;
	sender: {
		user: {
			id: string;
			username: string;
			avatar: string;
		};
		role: {id: string; name: string} | null;
		isOwner: boolean;
	} | null;
	text: string;
	type: "regular" | "join" | "date";
	createdAt: string;
}

export type {
	ProjectFromApi,
	TagFromApi,
	UserFromApi,
	RepoFromApi,
	RoleFromApi,
	ProjectRequestFromApi,
	ProjectChatMessageFromApi,
	ProjectUserFromApi,
	ProjectChatFromApi
};
