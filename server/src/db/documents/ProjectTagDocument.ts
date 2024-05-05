import {ProjectTagFromDb} from "#src/types/db";
import {
	DocumentImpl,
	ProjectTagDocument as ProjectTagDocumentType
} from "#src/types/db/documents";
import Document from "./Document";

class ProjectTagDocument
	extends Document
	implements DocumentImpl<ProjectTagDocumentType>
{
	projectId: ProjectTagDocumentType["projectId"];
	tagId: ProjectTagDocumentType["tagId"];

	constructor(obj: ProjectTagFromDb) {
		super(obj);
		this.projectId = obj.project_id;
		this.tagId = obj.tag_id;
	}

	toObject(): ProjectTagDocumentType {
		return {
			...super.toObject(),
			projectId: this.projectId,
			tagId: this.tagId
		};
	}
}

export default ProjectTagDocument;
