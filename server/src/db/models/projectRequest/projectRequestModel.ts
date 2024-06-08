import {PoolClient} from "pg";
import {ProjectRequestPayload} from "../../types/payloads";
import {ProjectRequestFromDb} from "../../types/rows";
import ProjectRequestDocument from "./ProjectRequestDocument";

const insert = async (
	client: PoolClient,
	payload: ProjectRequestPayload
): Promise<ProjectRequestDocument> => {
	const {userId, projectId, projectRoleId} = payload;

	const {
		rows: [request]
	} = await client.query<ProjectRequestFromDb>(
		"INSERT INTO project_requests(user_account_id, project_id, project_role_id) VALUES($1, $2, $3) RETURNING *;",
		[userId, projectId, projectRoleId]
	);

	return new ProjectRequestDocument(request);
};

const deleteById = async (client: PoolClient, id: string) => {
	return client.query<ProjectRequestFromDb>(
		"DELETE FROM project_requests WHERE id=$1;",
		[id]
	);
};

const findById = async (
	client: PoolClient,
	id: string
): Promise<ProjectRequestDocument | null> => {
	const {
		rows: [request]
	} = await client.query<ProjectRequestFromDb>(
		`SELECT * FROM project_requests WHERE id = $1;`,
		[id]
	);

	return request ? new ProjectRequestDocument(request) : null;
};

const findByReceiverUserId = async (client: PoolClient, id: string) => {
	const {rows} = await client.query<ProjectRequestFromDb>(
		`
		SELECT pr.* FROM project_requests pr
		JOIN project p ON pr.project_id = p.id
		WHERE p.owner_user_account_id = $1;
		`,
		[id]
	);

	return rows.map(r => new ProjectRequestDocument(r));
};

export default {deleteById, findById, findByReceiverUserId, insert};
