import {ProjectMessageDocument} from "#src/db/documents";
import {
	ProjectDocument,
	ProjectMessageDocument as ProjectMessageDocumentType,
	ProjectMessageFromDb,
	ProjectMessagePayload
} from "#src/db/types";
import Model from "../Model";
import {FindOptions, ProjectMessageModelImpl} from "./types";

class ProjectMessageModel extends Model implements ProjectMessageModelImpl {
	async insert(payload: ProjectMessagePayload) {
		const {projectId, userId, text, type, isSequential} = payload;

		const {
			rows: [message]
		} = await this.client.query<ProjectMessageFromDb>(
			"INSERT INTO project_messages(project_id, user_account_id, text, type, is_sequential) VALUES($1, $2, $3, $4, $5) RETURNING *;",
			[projectId, userId, text, type, isSequential]
		);

		return new ProjectMessageDocument(message);
	}

	async findByProjectId(id: ProjectDocument["id"], opts: FindOptions = {}) {
		const {limit, offset} = opts;

		let query = "SELECT * FROM project_messages WHERE project_id = $1";

		query += ` ORDER BY created_at DESC, serial_id DESC`;

		if (limit) {
			query += ` LIMIT ${limit}`;
		}

		if (offset) {
			query += ` OFFSET ${offset}`;
		}

		const {rows} = await this.client.query<ProjectMessageFromDb>(`${query};`, [
			id
		]);

		return rows.map(r => new ProjectMessageDocument(r));
	}

	async countByProjectId(id: ProjectDocument["id"]) {
		const {
			rows: [{count}]
		} = await this.client.query<{count: string}>(
			"SELECT COUNT(*) FROM project_messages WHERE project_id = $1;",
			[id]
		);

		return Number(count);
	}

	async findLatestByProjectId(id: ProjectDocument["id"]) {
		const {
			rows: [message]
		} = await this.client.query<ProjectMessageFromDb>(
			`
			SELECT * FROM project_messages
			WHERE project_id = $1 AND serial_id = (SELECT MAX(serial_id) FROM project_messages);
			`,
			[id]
		);

		return message ? new ProjectMessageDocument(message) : null;
	}

	async findById(id: ProjectMessageDocumentType["id"]) {
		const {
			rows: [message]
		} = await this.client.query<ProjectMessageFromDb>(
			"SELECT * FROM project_messages WHERE id = $1;",
			[id]
		);

		return message ? new ProjectMessageDocument(message) : null;
	}
}

export default ProjectMessageModel;
