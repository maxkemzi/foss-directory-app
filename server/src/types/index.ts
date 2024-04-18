interface GithubRepo {
	id: number;
	name: string;
	description: string | null;
	html_url: string;
	topics: string[];
}

export type {GithubRepo};
