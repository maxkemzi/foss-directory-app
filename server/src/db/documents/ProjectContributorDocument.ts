import {ProjectContributorFromDb} from "#src/types/db";
import {
	DocumentImpl,
	ProjectContributorDocument as ProjectContributorDocumentType
} from "#src/types/db/documents";
import Document from "./Document";

class ProjectContributorDocument
	extends Document
	implements DocumentImpl<ProjectContributorDocumentType>
{
	userId: ProjectContributorDocumentType["userId"];
	projectId: ProjectContributorDocumentType["projectId"];
	projectRoleId: ProjectContributorDocumentType["projectRoleId"];

	constructor(obj: ProjectContributorFromDb) {
		super(obj);
		this.userId = obj.user_id;
		this.projectId = obj.project_id;
		this.projectRoleId = obj.project_role_id;
	}

	toObject(): ProjectContributorDocumentType {
		return {
			...super.toObject(),
			userId: this.userId,
			projectId: this.projectId,
			projectRoleId: this.projectRoleId
		};
	}
}

export default ProjectContributorDocument;
