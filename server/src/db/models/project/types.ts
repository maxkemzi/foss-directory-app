interface Project {
	id: number;
	title: string;
	description: string;
	contributors_needed: number;
	last_updated: string;
	created_at: string;
	updated_at: string;
}

type ProjectPayload = Pick<
	Project,
	"title" | "description" | "contributors_needed" | "last_updated"
>;

export type {Project, ProjectPayload};
