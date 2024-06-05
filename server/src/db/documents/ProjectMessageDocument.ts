import {ProjectMessageFromDb} from "#src/types/db";
import {
	DocumentImpl,
	ProjectMessageDocument as ProjectMessageDocumentType
} from "#src/types/db/documents";
import Document from "./Document";

class ProjectMessageDocument
	extends Document
	implements DocumentImpl<ProjectMessageDocumentType>
{
	projectId: ProjectMessageDocumentType["projectId"];
	userId: ProjectMessageDocumentType["userId"];
	text: ProjectMessageDocumentType["text"];
	type: ProjectMessageDocumentType["type"];

	constructor(obj: ProjectMessageFromDb) {
		super(obj);
		this.projectId = obj.project_id;
		this.userId = obj.user_account_id;
		this.text = obj.text;
		this.type = obj.type;
	}

	toObject(): ProjectMessageDocumentType {
		return {
			...super.toObject(),
			projectId: this.projectId,
			userId: this.userId,
			text: this.text,
			type: this.type
		};
	}
}

export default ProjectMessageDocument;
