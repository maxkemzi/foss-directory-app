import {
	ProjectRequestDocument as ProjectRequestDocumentType,
	ProjectRequestFromDb
} from "../types";
import Document from "./Document";

class ProjectRequestDocument extends Document<ProjectRequestDocumentType> {
	userId: ProjectRequestDocumentType["userId"];
	projectId: ProjectRequestDocumentType["projectId"];
	projectRoleId: ProjectRequestDocumentType["projectRoleId"];

	constructor(obj: ProjectRequestFromDb) {
		super(obj);
		this.userId = obj.user_account_id;
		this.projectId = obj.project_id;
		this.projectRoleId = obj.project_role_id;
	}

	toObject(): ProjectRequestDocumentType {
		return {
			...super.toObject(),
			userId: this.userId,
			projectId: this.projectId,
			projectRoleId: this.projectRoleId
		};
	}
}

export default ProjectRequestDocument;
