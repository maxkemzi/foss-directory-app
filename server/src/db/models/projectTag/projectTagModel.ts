import {PoolClient} from "pg";
import {ProjectTagPayload} from "../../types/payloads";
import {ProjectFromDb, ProjectTagFromDb} from "../../types/rows";
import ProjectTagDocument from "./ProjectTagDocument";

const insert = async (client: PoolClient, payload: ProjectTagPayload) => {
	const {projectId, tagId, name} = payload;

	const {
		rows: [projectTag]
	} = await (tagId
		? client.query<ProjectTagFromDb>(
				"INSERT INTO project_tags(project_id, tag_id, is_custom) VALUES($1, $2, $3) RETURNING *;",
				[projectId, tagId, false]
			)
		: client.query<ProjectTagFromDb>(
				"INSERT INTO project_tags(project_id, name, is_custom) VALUES($1, $2, $3) RETURNING *;",
				[projectId, name, true]
			));

	return new ProjectTagDocument(projectTag);
};

const findByProjectId = async (
	client: PoolClient,
	id: ProjectFromDb["id"]
): Promise<ProjectTagDocument[]> => {
	const {rows} = await client.query<ProjectTagFromDb>(
		"SELECT * FROM project_tags WHERE project_id = $1 ORDER BY created_at ASC, serial_id ASC;",
		[id]
	);

	return rows.map(r => new ProjectTagDocument(r));
};

export default {insert, findByProjectId};
