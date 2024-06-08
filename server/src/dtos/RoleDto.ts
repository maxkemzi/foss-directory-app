import {RoleDocument} from "#src/db";

class RoleDto {
	id: RoleDocument["id"];
	name: RoleDocument["name"];

	constructor(doc: RoleDocument) {
		this.id = doc.id;
		this.name = doc.name;
	}
}

export default RoleDto;
