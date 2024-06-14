import {PoolClient} from "pg";
import {ProjectUserPayload} from "../../types/payloads";
import {ProjectUserFromDb} from "../../types/rows";
import ProjectUserDocument from "./ProjectUserDocument";
import {FindByProjectIdOptions} from "./types";

const insert = async (
	client: PoolClient,
	payload: ProjectUserPayload
): Promise<ProjectUserDocument> => {
	const {userId, projectId, projectRoleId, isOwner = false} = payload;

	const {
		rows: [user]
	} = await client.query<ProjectUserFromDb>(
		"INSERT INTO project_user_accounts(user_account_id, project_id, project_role_id, is_owner) VALUES($1, $2, $3, $4) RETURNING *;",
		[userId, projectId, projectRoleId, isOwner]
	);

	return new ProjectUserDocument(user);
};

const findByProjectId = async (
	client: PoolClient,
	id: string,
	opts: FindByProjectIdOptions = {}
) => {
	const {limit, offset} = opts;

	let query = "SELECT * FROM project_user_accounts WHERE project_id = $1";

	query += ` ORDER BY created_at DESC`;

	if (limit) {
		query += ` LIMIT ${limit}`;
	}

	if (offset) {
		query += ` OFFSET ${offset}`;
	}

	const {rows: users} = await client.query<ProjectUserFromDb>(`${query};`, [
		id
	]);

	return users.map(u => new ProjectUserDocument(u));
};

const countByProjectId = async (
	client: PoolClient,
	id: string
): Promise<number> => {
	const {
		rows: [{count}]
	} = await client.query<{count: string}>(
		"SELECT COUNT(*) FROM project_user_accounts WHERE project_id = $1;",
		[id]
	);

	return Number(count);
};

const findByProjectAndUserIds = async (
	client: PoolClient,
	payload: {projectId: string; userId: string}
) => {
	const {projectId, userId} = payload;

	const {
		rows: [user]
	} = await client.query<ProjectUserFromDb>(
		"SELECT * FROM project_user_accounts WHERE project_id = $1 AND user_account_id = $2;",
		[projectId, userId]
	);

	return user ? new ProjectUserDocument(user) : null;
};

const deleteByProjectAndUserIds = async (
	client: PoolClient,
	payload: {projectId: string; userId: string}
) => {
	const {projectId, userId} = payload;

	return client.query(
		"DELETE FROM project_user_accounts WHERE project_id = $1 AND user_account_id = $2;",
		[projectId, userId]
	);
};

export default {
	deleteByProjectAndUserIds,
	findByProjectId,
	insert,
	findByProjectAndUserIds,
	countByProjectId
};
