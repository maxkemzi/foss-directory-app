import {ProjectRoleFromDb} from "#src/types/db";
import {
	DocumentImpl,
	ProjectRoleDocument as ProjectRoleDocumentType
} from "#src/types/db/documents";
import Document from "./Document";

class ProjectRoleDocument
	extends Document
	implements DocumentImpl<ProjectRoleDocumentType>
{
	projectId: ProjectRoleDocumentType["projectId"];
	roleId: ProjectRoleDocumentType["roleId"];
	count: ProjectRoleDocumentType["count"];

	constructor(obj: ProjectRoleFromDb) {
		super(obj);
		this.projectId = obj.project_id;
		this.roleId = obj.role_id;
		this.count = obj.count;
	}

	toObject(): ProjectRoleDocumentType {
		return {
			...super.toObject(),
			projectId: this.projectId,
			roleId: this.roleId,
			count: this.count
		};
	}
}

export default ProjectRoleDocument;
