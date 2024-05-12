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
	senderId: ProjectMessageDocumentType["senderId"];
	text: ProjectMessageDocumentType["text"];

	constructor(obj: ProjectMessageFromDb) {
		super(obj);
		this.projectId = obj.project_id;
		this.senderId = obj.sender_id;
		this.text = obj.text;
	}

	toObject(): ProjectMessageDocumentType {
		return {
			...super.toObject(),
			projectId: this.projectId,
			senderId: this.senderId,
			text: this.text
		};
	}
}

export default ProjectMessageDocument;
