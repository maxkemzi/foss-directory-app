import {DocumentObject, RowFromDb} from "../types";

abstract class Document<T extends DocumentObject> {
	id: string;
	createdAt: string;
	updatedAt: string;

	constructor(row: RowFromDb) {
		this.id = row.id;
		this.createdAt = row.created_at;
		this.updatedAt = row.updated_at;
	}

	toObject(): DocumentObject | T {
		return {
			id: this.id,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt
		};
	}
}

export default Document;
