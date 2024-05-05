import {RoleFromDb} from "#src/types/db";
import {
	DocumentImpl,
	RoleDocument as RoleDocumentType
} from "#src/types/db/documents";
import Document from "./Document";

class RoleDocument extends Document implements DocumentImpl<RoleDocumentType> {
	name: RoleDocumentType["name"];

	constructor(obj: RoleFromDb) {
		super(obj);
		this.name = obj.name;
	}

	toObject(): RoleDocumentType {
		return {...super.toObject(), name: this.name};
	}
}

export default RoleDocument;
