import {TagDocumentData, TagFromDb} from "./types";

class TagDocument {
	id: TagFromDb["id"];
	name: TagFromDb["name"];
	createdAt: TagFromDb["created_at"];
	updatedAt: TagFromDb["updated_at"];

	constructor(model: TagFromDb) {
		this.id = model.id;
		this.name = model.name;
		this.createdAt = model.created_at;
		this.updatedAt = model.updated_at;
	}

	toObject(): TagDocumentData {
		return {
			id: this.id,
			name: this.name,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt
		};
	}
}

export default TagDocument;
