import {TagDocument} from "#src/types/db/documents";

class TagDto {
	id: TagDocument["id"];
	name: TagDocument["name"];

	constructor(doc: TagDocument) {
		this.id = doc.id;
		this.name = doc.name;
	}
}

export default TagDto;
