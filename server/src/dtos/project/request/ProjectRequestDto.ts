import {ProjectRequestDocument} from "#src/types/db/documents";

class ProjectRequestDto {
	id: ProjectRequestDocument["id"];
	userId: ProjectRequestDocument["userId"];
	projectId: ProjectRequestDocument["projectId"];
	projectRoleId: ProjectRequestDocument["projectRoleId"];

	constructor(doc: ProjectRequestDocument) {
		this.id = doc.id;
		this.userId = doc.userId;
		this.projectId = doc.projectId;
		this.projectRoleId = doc.projectRoleId;
	}
}

export default ProjectRequestDto;
