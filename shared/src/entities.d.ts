export interface SessionFromApi {
	user: UserFromApi;
	accessToken: string;
}

export interface ProjectFromApi {
	id: string;
	name: string;
	description: string;
	repoUrl: string;
	ownerUser: {id: string; username: string};
	tags: {id: string; name: string}[];
	roles: {id: string; name: string; placesAvailable: number}[];
	memberCount: number;
	isRequestable: boolean;
}

export interface TagFromApi {
	id: string;
	name: string;
}

export interface RoleFromApi {
	id: string;
	name: string;
}

export interface UserFromApi {
	id: string;
	username: string;
	email: string;
	avatar: string | null;
	githubIsConnected: boolean;
}

export interface RepoFromApi {
	id: number;
	name: string;
	description: string | null;
	url: string;
	topics: string[];
}

export interface ProjectRequestFromApi {
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

export interface ProjectUserFromApi {
	id: string;
	user: {
		id: string;
		username: string;
		avatar: string;
	};
	role: {id: string; name: string};
	isOwner: boolean;
}

export interface ProjectMessageFromApi {
	id: string;
	text: string | null;
	type: "regular" | "join" | "leave",
	sender: {
		user: {
			id: string;
			username: string;
			avatar: string;
		};
		role: {id: string; name: string} | null;
		isOwner: boolean;
	} | null;
	isSequential: boolean;
	createdAt: string;
}
