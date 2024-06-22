import {PoolClient} from "pg";
import {ProjectRolePayload} from "../../types/payloads";
import {ProjectFromDb, ProjectRoleFromDb, UserFromDb} from "../../types/rows";
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

const findById = async (
	client: PoolClient,
	id: ProjectRoleFromDb["id"]
): Promise<ProjectRoleDocument | null> => {
	const {
		rows: [role]
	} = await client.query<ProjectRoleFromDb>(
		"SELECT * FROM project_roles WHERE id = $1;",
		[id]
	);

	return role ? new ProjectRoleDocument(role) : null;
};

const findByProjectId = async (
	client: PoolClient,
	id: ProjectFromDb["id"]
): Promise<ProjectRoleDocument[]> => {
	const {rows} = await client.query<ProjectRoleFromDb>(
		"SELECT * FROM project_roles WHERE project_id = $1 AND places_available > 0 ORDER BY created_at ASC, serial_id ASC;",
		[id]
	);

	return rows.map(r => new ProjectRoleDocument(r));
};

const findByProjectAndUserIds = async (
	client: PoolClient,
	projectId: ProjectFromDb["id"],
	userId: UserFromDb["id"]
): Promise<ProjectRoleDocument | null> => {
	const {
		rows: [role]
	} = await client.query<ProjectRoleFromDb>(
		`
		SELECT pr.* FROM project_roles pr
		JOIN project_user_accounts pua ON pua.project_role_id = pr.id
		WHERE pr.project_id = $1 AND pua.user_account_id = $2 ORDER BY created_at ASC, serial_id ASC;
		`,
		[projectId, userId]
	);

	return role ? new ProjectRoleDocument(role) : null;
};

export default {insert, findById, findByProjectId, findByProjectAndUserIds};
