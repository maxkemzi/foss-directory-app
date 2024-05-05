import {ProjectDocument} from "#src/types/db/documents";

class ProjectDto {
	id: ProjectDocument["id"];
	name: ProjectDocument["name"];
	description: ProjectDocument["description"];
	repoUrl: ProjectDocument["repoUrl"];

	constructor(doc: ProjectDocument) {
		this.id = doc.id;
		this.name = doc.name;
		this.description = doc.description;
		this.repoUrl = doc.repoUrl;
	}
}

export default ProjectDto;
