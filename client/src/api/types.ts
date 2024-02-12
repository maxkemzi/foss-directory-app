interface Project {
	id: number;
	name: string;
	description: string;
	repoUrl: string;
}

interface Tag {
	id: number;
	name: string;
}

interface User {
	id: number;
	username: string;
	email: string;
	githubIsConnected: boolean;
}

export type {Project, Tag, User};
