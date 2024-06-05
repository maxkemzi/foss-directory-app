import {ProjectUserFromDb} from "#src/types/db";
import {
	DocumentImpl,
	ProjectUserDocument as ProjectUserDocumentType
} from "#src/types/db/documents";
import Document from "./Document";

class ProjectUserDocument
	extends Document
	implements DocumentImpl<ProjectUserDocumentType>
{
	userId: ProjectUserDocumentType["userId"];
	projectId: ProjectUserDocumentType["projectId"];
	projectRoleId: ProjectUserDocumentType["projectRoleId"];
	isOwner: ProjectUserDocumentType["isOwner"];

	constructor(obj: ProjectUserFromDb) {
		super(obj);
		this.userId = obj.user_account_id;
		this.projectId = obj.project_id;
		this.projectRoleId = obj.project_role_id;
		this.isOwner = obj.is_owner;
	}

	toObject(): ProjectUserDocumentType {
		return {
			...super.toObject(),
			userId: this.userId,
			projectId: this.projectId,
			projectRoleId: this.projectRoleId,
			isOwner: this.isOwner
		};
	}
}

export default ProjectUserDocument;
