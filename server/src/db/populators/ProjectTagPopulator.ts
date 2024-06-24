import {
	PopulatedProjectTagDocument,
	ProjectTagDocument,
	TagFromDb
} from "../types";
import Populator from "./Populator";

class ProjectTagPopulator extends Populator<
	ProjectTagDocument,
	PopulatedProjectTagDocument
> {
	async populate(
		doc: ProjectTagDocument
	): Promise<PopulatedProjectTagDocument> {
		const {id} = doc;

		const {
			rows: [tag]
		} = await this.client.query<TagFromDb>(
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

export default ProjectTagPopulator;
