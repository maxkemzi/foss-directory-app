import {ProjectRequestDocument} from "#src/db/documents";
import {
	ProjectRequestDocument as ProjectRequestDocumentType,
	ProjectRequestFromDb,
	ProjectRequestPayload,
	UserDocument
} from "#src/db/types";
import Model from "../Model";
import {FindOptions, ProjectRequestModelImpl} from "./types";

class ProjectRequestModel extends Model implements ProjectRequestModelImpl {
	async insert(payload: ProjectRequestPayload) {
		const {userId, projectId, projectRoleId} = payload;

		const {
			rows: [request]
		} = await this.client.query<ProjectRequestFromDb>(
			"INSERT INTO project_requests(user_account_id, project_id, project_role_id) VALUES($1, $2, $3) RETURNING *;",
			[userId, projectId, projectRoleId]
		);

		return new ProjectRequestDocument(request);
	}

	async deleteById(id: ProjectRequestDocumentType["id"]) {
		await this.client.query<ProjectRequestFromDb>(
			"DELETE FROM project_requests WHERE id=$1;",
			[id]
		);
	}

	async findById(id: ProjectRequestDocumentType["id"]) {
		const {
			rows: [request]
		} = await this.client.query<ProjectRequestFromDb>(
			`SELECT * FROM project_requests WHERE id = $1;`,
			[id]
		);

		return request ? new ProjectRequestDocument(request) : null;
	}

	async findByReceiverUserId(id: UserDocument["id"], opts: FindOptions = {}) {
		const {limit, offset} = opts;

		let query = `
		SELECT pr.* FROM project_requests pr
		JOIN project p ON pr.project_id = p.id
		WHERE p.owner_user_account_id = $1
	`;

		query += ` ORDER BY created_at DESC, serial_id DESC`;

		if (limit) {
			query += ` LIMIT ${limit}`;
		}

		if (offset) {
			query += ` OFFSET ${offset}`;
		}

		const {rows} = await this.client.query<ProjectRequestFromDb>(`${query};`, [
			id
		]);

		return rows.map(r => new ProjectRequestDocument(r));
	}

	async countByReceiverUserId(id: UserDocument["id"]) {
		const {
			rows: [{count}]
		} = await this.client.query<{count: string}>(
			`
			SELECT COUNT(*) FROM project_requests pr
			JOIN project p ON pr.project_id = p.id
			WHERE p.owner_user_account_id = $1;
		`,
			[id]
		);

		return Number(count);
	}
}

export default ProjectRequestModel;
