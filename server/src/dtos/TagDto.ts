import {Tag} from "#src/db/types";

class TagDto {
	id: number;
	name: string;

	constructor(doc: Tag) {
		this.id = doc.id;
		this.name = doc.name;
	}
}

export default TagDto;
