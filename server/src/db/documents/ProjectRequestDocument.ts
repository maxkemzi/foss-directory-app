import {ProjectRequestFromDb} from "#src/types/db";
import {
	DocumentImpl,
	ProjectRequestDocument as ProjectRequestDocumentType
} from "#src/types/db/documents";
import Document from "./Document";

class ProjectRequestDocument
	extends Document
	implements DocumentImpl<ProjectRequestDocumentType>
{
	requesterId: ProjectRequestDocumentType["requesterId"];
	projectId: ProjectRequestDocumentType["projectId"];
	projectRoleId: ProjectRequestDocumentType["projectRoleId"];

	constructor(obj: ProjectRequestFromDb) {
		super(obj);
		this.requesterId = obj.requester_id;
		this.projectId = obj.project_id;
		this.projectRoleId = obj.project_role_id;
	}

	toObject(): ProjectRequestDocumentType {
		return {
			...super.toObject(),
			requesterId: this.requesterId,
			projectId: this.projectId,
			projectRoleId: this.projectRoleId
		};
	}
}

export default ProjectRequestDocument;
