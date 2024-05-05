import {ProjectContributorFromDb} from "#src/types/db";
import {
	DocumentImpl,
	ProjectContributorDocument as ProjectContributorDocumentType
} from "#src/types/db/documents";
import Document from "./Document";

class ProjectContributorDocument
	extends Document
	implements DocumentImpl<ProjectContributorDocumentType>
{
	projectId: ProjectContributorDocumentType["projectId"];
	contributorId: ProjectContributorDocumentType["contributorId"];

	constructor(obj: ProjectContributorFromDb) {
		super(obj);
		this.projectId = obj.project_id;
		this.contributorId = obj.contributor_id;
	}

	toObject(): ProjectContributorDocumentType {
		return {
			...super.toObject(),
			projectId: this.projectId,
			contributorId: this.contributorId
		};
	}
}

export default ProjectContributorDocument;
