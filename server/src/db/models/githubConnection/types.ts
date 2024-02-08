interface GithubConnectionFromDb {
	id: number;
	user_id: number;
	token: string;
	created_at: string;
	updated_at: string;
}

interface GithubConnectionDocumentData {
	id: number;
	userId: number;
	token: string;
	createdAt: string;
	updatedAt: string;
}

interface GithubConnectionPayload {
	userId: number;
	token: string;
}

export type {
	GithubConnectionFromDb,
	GithubConnectionDocumentData,
	GithubConnectionPayload
};
