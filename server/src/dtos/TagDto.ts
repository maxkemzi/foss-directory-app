import {TagDocument} from "#src/db";

class TagDto {
	id: TagDocument["id"];
	name: TagDocument["name"];

	constructor(doc: TagDocument) {
		this.id = doc.id;
		this.name = doc.name;
	}
}

export default TagDto;
