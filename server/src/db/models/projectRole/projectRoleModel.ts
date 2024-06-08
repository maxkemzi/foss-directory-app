import {PoolClient} from "pg";
import {ProjectRolePayload} from "../../types/payloads";
import {ProjectRoleFromDb} from "../../types/rows";
import ProjectRoleDocument from "./ProjectRoleDocument";

const insert = async (client: PoolClient, payload: ProjectRolePayload) => {
	const {projectId, roleId, name, placesAvailable = 0} = payload;

	const {
		rows: [role]
	} = await (roleId
		? client.query<ProjectRoleFromDb>(
				"INSERT INTO project_roles(project_id, role_id, places_available, is_custom) VALUES($1, $2, $3, $4) RETURNING *;",
				[projectId, roleId, placesAvailable, false]
			)
		: client.query<ProjectRoleFromDb>(
				"INSERT INTO project_roles(project_id, name, places_available, is_custom) VALUES($1, $2, $3, $4) RETURNING *;",
				[projectId, name, placesAvailable, true]
			));

	return new ProjectRoleDocument(role);
};

export default {insert};
