import {ProjectMessageDocument} from "#src/types/db/documents";

class ProjectMessageDto {
	id: ProjectMessageDocument["id"];
	text: ProjectMessageDocument["text"];
	createdAt: ProjectMessageDocument["createdAt"];

	constructor(doc: ProjectMessageDocument) {
		this.id = doc.id;
		this.text = doc.text;
		this.createdAt = doc.createdAt;
	}
}

export default ProjectMessageDto;
