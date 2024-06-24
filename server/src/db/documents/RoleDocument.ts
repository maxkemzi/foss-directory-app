import {RoleDocument as RoleDocumentType, RoleFromDb} from "../types";
import Document from "./Document";

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
