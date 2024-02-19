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

export type {ProjectFromApi, TagFromApi, UserFromApi};
