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
	requestorId: ProjectRequestDocumentType["requestorId"];
	projectRoleId: ProjectRequestDocumentType["projectRoleId"];

	constructor(obj: ProjectRequestFromDb) {
		super(obj);
		this.requestorId = obj.requestor_id;
		this.projectRoleId = obj.project_role_id;
	}

	toObject(): ProjectRequestDocumentType {
		return {
			...super.toObject(),
			requestorId: this.requestorId,
			projectRoleId: this.projectRoleId
		};
	}
}

export default ProjectRequestDocument;
