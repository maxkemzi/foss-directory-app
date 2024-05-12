import {ProjectRequestDocument} from "#src/types/db/documents";

class ProjectRequestDto {
	id: ProjectRequestDocument["id"];
	requesterId: ProjectRequestDocument["requesterId"];
	projectId: ProjectRequestDocument["projectId"];
	projectRoleId: ProjectRequestDocument["projectRoleId"];

	constructor(doc: ProjectRequestDocument) {
		this.id = doc.id;
		this.requesterId = doc.requesterId;
		this.projectId = doc.projectId;
		this.projectRoleId = doc.projectRoleId;
	}
}

export default ProjectRequestDto;
