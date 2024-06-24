import {TagDocument as TagDocumentType, TagFromDb} from "../types";
import Document from "./Document";

class TagDocument extends Document<TagDocumentType> {
	name: TagDocumentType["name"];

	constructor(obj: TagFromDb) {
		super(obj);
		this.name = obj.name;
	}

	toObject(): TagDocumentType {
		return {...super.toObject(), name: this.name};
	}
}

export default TagDocument;
