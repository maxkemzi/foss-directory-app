interface TagFromDb {
	id: number;
	name: string;
	created_at: string;
	updated_at: string;
}

interface TagDocumentData {
	id: number;
	name: string;
	createdAt: string;
	updatedAt: string;
}

interface TagPayload {
	name: string;
}

export type {TagFromDb, TagDocumentData, TagPayload};
