import {ProjectRequestDocument} from "#src/types/db/documents";

class ProjectRequestDto {
	id: ProjectRequestDocument["id"];
	projectRoleId: ProjectRequestDocument["projectRoleId"];
	requestorId: ProjectRequestDocument["requestorId"];

	constructor(doc: ProjectRequestDocument) {
		this.id = doc.id;
		this.projectRoleId = doc.projectRoleId;
		this.requestorId = doc.requestorId;
	}
}

export default ProjectRequestDto;
