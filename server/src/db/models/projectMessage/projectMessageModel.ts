import {PoolClient} from "pg";
import {ProjectMessagePayload} from "../../types/payloads";
import {ProjectMessageFromDb} from "../../types/rows";
import ProjectMessageDocument from "./ProjectMessageDocument";

const insert = async (
	client: PoolClient,
	payload: ProjectMessagePayload
): Promise<ProjectMessageDocument> => {
	const {projectId, userId, text, type} = payload;

	const {
		rows: [message]
	} = await client.query<ProjectMessageFromDb>(
		"INSERT INTO project_messages(project_id, user_account_id, text, type) VALUES($1, $2, $3, $4) RETURNING *;",
		[projectId, userId, text, type]
	);

	return new ProjectMessageDocument(message);
};

const findByProjectId = async (
	client: PoolClient,
	id: string
): Promise<ProjectMessageDocument[]> => {
	const {rows} = await client.query<ProjectMessageFromDb>(
		"SELECT * FROM project_messages WHERE project_id = $1;",
		[id]
	);

	return rows.map(r => new ProjectMessageDocument(r));
};

const findById = async (
	client: PoolClient,
	id: string
): Promise<ProjectMessageDocument | null> => {
	const {
		rows: [message]
	} = await client.query<ProjectMessageFromDb>(
		"SELECT * FROM project_messages WHERE id = $1;",
		[id]
	);

	return message ? new ProjectMessageDocument(message) : null;
};

export default {findById, findByProjectId, insert};
