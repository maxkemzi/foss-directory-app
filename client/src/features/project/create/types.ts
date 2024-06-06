interface FormFields {
	name: string;
	description: string;
	repoUrl: string;
	role: string;
	tags: string[];
	roles: {[key: string]: number};
}

export type {FormFields};
