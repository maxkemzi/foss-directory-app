interface ProjectFromApi {
	id: string;
	name: string;
	description: string;
	repoUrl: string;
	owner: {id: string; username: string};
	tags: {id: string; name: string}[];
	roles: {id: string; name: string; placesAvailable: number}[];
	requestable: boolean;
	contributorCount: number;
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
	requester: {
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

interface ProjectMessageFromApi {
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

interface ProjectContributorFromApi {
	id: string;
	user: {
		id: string;
		username: string;
		avatar: string;
	};
	role: {id: string; name: string};
	isOwner: boolean;
}

export type {
	ProjectFromApi,
	TagFromApi,
	UserFromApi,
	RepoFromApi,
	RoleFromApi,
	ProjectRequestFromApi,
	ProjectMessageFromApi,
	ProjectContributorFromApi
};
