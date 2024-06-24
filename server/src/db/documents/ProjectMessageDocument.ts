import {
	ProjectMessageDocument as ProjectMessageDocumentType,
	ProjectMessageFromDb
} from "../types";
import Document from "./Document";

class ProjectMessageDocument extends Document<ProjectMessageDocumentType> {
	projectId: ProjectMessageDocumentType["projectId"];
	userId: ProjectMessageDocumentType["userId"];
	text: ProjectMessageDocumentType["text"];
	type: ProjectMessageDocumentType["type"];
	isSequential: ProjectMessageDocumentType["isSequential"];

	constructor(obj: ProjectMessageFromDb) {
		super(obj);
		this.projectId = obj.project_id;
		this.userId = obj.user_account_id;
		this.text = obj.text;
		this.type = obj.type;
		this.isSequential = obj.is_sequential;
	}

	toObject(): ProjectMessageDocumentType {
		return {
			...super.toObject(),
			projectId: this.projectId,
			userId: this.userId,
			text: this.text,
			type: this.type,
			isSequential: this.isSequential
		};
	}
}

export default ProjectMessageDocument;
