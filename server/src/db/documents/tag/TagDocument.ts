import {Tag, TagFromDb} from "../../types";
import Document from "../Document";
import {DocumentImpl} from "../types";

class TagDocument extends Document implements DocumentImpl<Tag> {
	name: TagFromDb["name"];

	constructor(obj: TagFromDb) {
		super(obj);
		this.name = obj.name;
	}

	toObject(): Tag {
		return {...super.toObject(), name: this.name};
	}
}

export default TagDocument;
