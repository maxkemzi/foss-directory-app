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
	name: ProjectTagDocumentType["name"];
	isCustom: ProjectTagDocumentType["isCustom"];

	constructor(obj: ProjectTagFromDb) {
		super(obj);
		this.projectId = obj.project_id;
		this.tagId = obj.tag_id;
		this.name = obj.name;
		this.isCustom = obj.is_custom;
	}

	toObject(): ProjectTagDocumentType {
		return {
			...super.toObject(),
			projectId: this.projectId,
			tagId: this.tagId,
			name: this.name,
			isCustom: this.isCustom
		};
	}
}

export default ProjectTagDocument;
