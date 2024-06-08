import Document from "../../lib/Document";
import {TagDocument as TagDocumentType} from "../../types/documents";
import {TagFromDb} from "../../types/rows";

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
