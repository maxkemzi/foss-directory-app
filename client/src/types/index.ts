interface ProjectFromApi {
	id: number;
	name: string;
	description: string;
	repoUrl: string;
}

interface TagFromApi {
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

export type {ProjectFromApi, TagFromApi, UserFromApi, RepoFromApi};
