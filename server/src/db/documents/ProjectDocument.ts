import {ProjectFromDb} from "#src/types/db";
import {
	DocumentImpl,
	ProjectDocument as ProjectDocumentType
} from "#src/types/db/documents";
import Document from "./Document";

class ProjectDocument
	extends Document
	implements DocumentImpl<ProjectDocumentType>
{
	ownerId: ProjectDocumentType["ownerId"];
	name: ProjectDocumentType["name"];
	description: ProjectDocumentType["description"];
	repoUrl: ProjectDocumentType["repoUrl"];

	constructor(obj: ProjectFromDb) {
		super(obj);
		this.ownerId = obj.owner_id;
		this.name = obj.name;
		this.description = obj.description;
		this.repoUrl = obj.repo_url;
	}

	toObject(): ProjectDocumentType {
		return {
			...super.toObject(),
			ownerId: this.ownerId,
			name: this.name,
			description: this.description,
			repoUrl: this.repoUrl
		};
	}
}

export default ProjectDocument;
