interface Project {
	id: number;
	title: string;
	description: string;
	contributors_needed: number;
	last_updated: string;
	created_at: string;
	updated_at: string;
}

interface User {
	id: number;
	username: string;
	email: string;
}

export type {Project, User};
