import {PopulatedProjectRequestDocument} from "#src/types/db/documents";

type Requester = PopulatedProjectRequestDocument["requester"];
type Project = PopulatedProjectRequestDocument["project"];
type Role = PopulatedProjectRequestDocument["role"];

class PopulatedProjectRequestDto {
	id: PopulatedProjectRequestDocument["id"];
	requester: {id: Requester["id"]; username: Requester["username"]};
	project: {id: Project["id"]; name: Project["name"]};
	role: {id: Role["id"]; name: Role["name"]};

	constructor(doc: PopulatedProjectRequestDocument) {
		this.id = doc.id;
		this.requester = {id: doc.requester.id, username: doc.requester.username};
		this.project = {id: doc.project.id, name: doc.project.name};
		this.role = {id: doc.role.id, name: doc.role.name};
	}
}

export default PopulatedProjectRequestDto;
