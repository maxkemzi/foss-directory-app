import Document from "../../lib/Document";
import {ProjectRoleDocument as ProjectRoleDocumentType} from "../../types/documents";
import {ProjectRoleFromDb} from "../../types/rows";

class ProjectRoleDocument extends Document<ProjectRoleDocumentType> {
	projectId: ProjectRoleDocumentType["projectId"];
	roleId: ProjectRoleDocumentType["roleId"];
	name: ProjectRoleDocumentType["name"];
	placesAvailable: ProjectRoleDocumentType["placesAvailable"];
	isCustom: ProjectRoleDocumentType["isCustom"];

	constructor(obj: ProjectRoleFromDb) {
		super(obj);
		this.projectId = obj.project_id;
		this.roleId = obj.role_id;
		this.name = obj.name;
		this.placesAvailable = obj.places_available;
		this.isCustom = obj.is_custom;
	}

	toObject(): ProjectRoleDocumentType {
		return {
			...super.toObject(),
			projectId: this.projectId,
			roleId: this.roleId,
			name: this.name,
			placesAvailable: this.placesAvailable,
			isCustom: this.isCustom
		};
	}
}

export default ProjectRoleDocument;
