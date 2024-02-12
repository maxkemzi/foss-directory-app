import {TagDocumentData} from "#src/db/models";

class TagDto {
	id: number;
	name: string;

	constructor(doc: TagDocumentData) {
		this.id = doc.id;
		this.name = doc.name;
	}
}

export default TagDto;
