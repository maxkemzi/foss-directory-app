import Document from "../../lib/Document";
import {RoleDocument as RoleDocumentType} from "../../types/documents";
import {RoleFromDb} from "../../types/rows";

class RoleDocument extends Document<RoleDocumentType> {
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
