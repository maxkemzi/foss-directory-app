interface CustomTagFromDb {
	id: number;
	project_id: number;
	name: string;
	created_at: string;
	updated_at: string;
}

interface CustomTagDocumentData {
	id: number;
	projectId: number;
	name: string;
	createdAt: string;
	updatedAt: string;
}

export type {CustomTagFromDb, CustomTagDocumentData};
