import {TagFromDb} from "#src/types/db";
import {
	DocumentImpl,
	TagDocument as TagDocumentType
} from "#src/types/db/documents";
import Document from "./Document";

class TagDocument extends Document implements DocumentImpl<TagDocumentType> {
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
