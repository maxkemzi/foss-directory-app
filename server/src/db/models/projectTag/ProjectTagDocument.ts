import {PoolClient} from "pg";
import Document from "../../lib/Document";
import {
	PopulatableDocument,
	PopulatedProjectTagDocument,
	ProjectTagDocument as ProjectTagDocumentType
} from "../../types/documents";
import {ProjectTagFromDb, TagFromDb} from "../../types/rows";

class ProjectTagDocument
	extends Document<ProjectTagDocumentType>
	implements PopulatableDocument<PopulatedProjectTagDocument>
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

	async populate(client: PoolClient): Promise<PopulatedProjectTagDocument> {
		const {id} = this;

		const {
			rows: [tag]
		} = await client.query<TagFromDb>(
			`
			SELECT pt.id, COALESCE(t.name, pt.name) as name, pt.created_at, pt.updated_at
			FROM project_tags pt
			LEFT JOIN tag t ON pt.tag_id = t.id
			WHERE pt.id = $1;
		`,
			[id]
		);

		return {
			id: tag.id,
			name: tag.name,
			createdAt: tag.created_at,
			updatedAt: tag.updated_at
		};
	}
}

export default ProjectTagDocument;
