import {PopulatedProjectRequestDocument} from "#src/db";

type User = PopulatedProjectRequestDocument["user"];
type Project = PopulatedProjectRequestDocument["project"];
type Role = PopulatedProjectRequestDocument["role"];

class ProjectRequestDto {
	id: PopulatedProjectRequestDocument["id"];
	user: {id: User["id"]; username: User["username"]};
	project: {id: Project["id"]; name: Project["name"]};
	role: {id: Role["id"]; name: Role["name"]};

	constructor(doc: PopulatedProjectRequestDocument) {
		this.id = doc.id;
		this.user = {id: doc.user.id, username: doc.user.username};
		this.project = {id: doc.project.id, name: doc.project.name};
		this.role = {id: doc.role.id, name: doc.role.name};
	}
}

export default ProjectRequestDto;
