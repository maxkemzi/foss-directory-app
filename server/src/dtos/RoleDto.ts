import {RoleDocument} from "#src/types/db/documents";

class RoleDto {
	id: RoleDocument["id"];
	name: RoleDocument["name"];

	constructor(doc: RoleDocument) {
		this.id = doc.id;
		this.name = doc.name;
	}
}

export default RoleDto;
