import {PoolClient} from "pg";
import {ProjectTagPayload} from "../../types/payloads";
import {ProjectTagFromDb} from "../../types/rows";
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

export default {insert};
