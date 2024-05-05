import {ObjectFromDb} from "#src/types/db";
import {DocumentImpl, DocumentObject} from "#src/types/db/documents";

class Document implements DocumentImpl<DocumentObject> {
	id: number;
	createdAt: string;
	updatedAt: string;

	constructor(obj: ObjectFromDb) {
		this.id = obj.id;
		this.createdAt = obj.created_at;
		this.updatedAt = obj.updated_at;
	}

	toObject(): DocumentObject {
		return {
			id: this.id,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt
		};
	}
}

export default Document;
