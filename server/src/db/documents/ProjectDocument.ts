import {ProjectDocument as ProjectDocumentType} from "../types/documents";
import {ProjectFromDb} from "../types/rows";
import Document from "./Document";

class ProjectDocument extends Document<ProjectDocumentType> {
	ownerUserId: ProjectDocumentType["ownerUserId"];
	name: ProjectDocumentType["name"];
	description: ProjectDocumentType["description"];
	repoUrl: ProjectDocumentType["repoUrl"];

	constructor(obj: ProjectFromDb) {
		super(obj);
		this.ownerUserId = obj.owner_user_account_id;
		this.name = obj.name;
		this.description = obj.description;
		this.repoUrl = obj.repo_url;
	}

	toObject(): ProjectDocumentType {
		return {
			...super.toObject(),
			ownerUserId: this.ownerUserId,
			name: this.name,
			description: this.description,
			repoUrl: this.repoUrl
		};
	}
}

export default ProjectDocument;
