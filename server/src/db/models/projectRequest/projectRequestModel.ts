import {PoolClient} from "pg";
import {ProjectRequestPayload} from "../../types/payloads";
import {ProjectRequestFromDb} from "../../types/rows";
import ProjectRequestDocument from "./ProjectRequestDocument";
import {FindByReceiverUserIdOptions} from "./types";

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

const findByReceiverUserId = async (
	client: PoolClient,
	id: string,
	opts: FindByReceiverUserIdOptions = {}
) => {
	const {limit, offset} = opts;

	let query = `
		SELECT pr.* FROM project_requests pr
		JOIN project p ON pr.project_id = p.id
		WHERE p.owner_user_account_id = $1
	`;

	query += ` ORDER BY created_at DESC`;

	if (limit) {
		query += ` LIMIT ${limit}`;
	}

	if (offset) {
		query += ` OFFSET ${offset}`;
	}

	const {rows} = await client.query<ProjectRequestFromDb>(`${query};`, [id]);

	return rows.map(r => new ProjectRequestDocument(r));
};

const countByReceiverUserId = async (
	client: PoolClient,
	id: string
): Promise<number> => {
	const {
		rows: [{count}]
	} = await client.query<{count: string}>(
		`
		SELECT COUNT(*) FROM project_requests pr
		JOIN project p ON pr.project_id = p.id
		WHERE p.owner_user_account_id = $1;
	`,
		[id]
	);

	return Number(count);
};

export default {
	deleteById,
	findById,
	findByReceiverUserId,
	countByReceiverUserId,
	insert
};
