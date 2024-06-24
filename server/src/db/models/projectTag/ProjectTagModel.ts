import {ProjectTagDocument} from "#src/db/documents";
import {
	ProjectDocument,
	ProjectTagFromDb,
	ProjectTagPayload
} from "#src/db/types";
import Model from "../Model";
import {ProjectTagModelImpl} from "./types";

class ProjectTagModel extends Model implements ProjectTagModelImpl {
	async insert(payload: ProjectTagPayload) {
		const {projectId, tagId, name} = payload;

		const {
			rows: [projectTag]
		} = await (tagId
			? this.client.query<ProjectTagFromDb>(
					"INSERT INTO project_tags(project_id, tag_id, is_custom) VALUES($1, $2, $3) RETURNING *;",
					[projectId, tagId, false]
				)
			: this.client.query<ProjectTagFromDb>(
					"INSERT INTO project_tags(project_id, name, is_custom) VALUES($1, $2, $3) RETURNING *;",
					[projectId, name, true]
				));

		return new ProjectTagDocument(projectTag);
	}

	async findByProjectId(id: ProjectDocument["id"]) {
		const {rows} = await this.client.query<ProjectTagFromDb>(
			"SELECT * FROM project_tags WHERE project_id = $1 ORDER BY created_at ASC, serial_id ASC;",
			[id]
		);

		return rows.map(r => new ProjectTagDocument(r));
	}
}

export default ProjectTagModel;
