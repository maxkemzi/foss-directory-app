interface ObjectFromDb {
	id: number;
	created_at: string;
	updated_at: string;
}

interface DocumentObject {
	id: ObjectFromDb["id"];
	createdAt: ObjectFromDb["created_at"];
	updatedAt: ObjectFromDb["updated_at"];
}

export type {DocumentObject, ObjectFromDb};
