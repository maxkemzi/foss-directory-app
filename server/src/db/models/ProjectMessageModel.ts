import {ProjectMessageFromDb} from "#src/types/db";
import {ProjectMessagePayload} from "#src/types/db/models";
import Db from "../Db";
import {ProjectMessageDocument} from "../documents";

class ProjectMessageModel {
	static async create({
		projectId,
		userId,
		text,
		type
	}: ProjectMessagePayload): Promise<ProjectMessageDocument> {
		const {rows} = await Db.query<ProjectMessageFromDb>(
			"INSERT INTO projects_messages(project_id, user_id, text, type) VALUES($1, $2, $3, $4) RETURNING *;",
			[projectId, userId, text, type]
		);
		return new ProjectMessageDocument(rows[0]);
	}

	static async getByProjectId(id: string): Promise<ProjectMessageDocument[]> {
		const {rows} = await Db.query<ProjectMessageFromDb>(
			"SELECT * FROM projects_messages WHERE project_id = $1;",
			[id]
		);
		return rows.map(r => new ProjectMessageDocument(r));
	}

	static async getById(id: string): Promise<ProjectMessageDocument | null> {
		const {
			rows: [message]
		} = await Db.query<ProjectMessageFromDb>(
			"SELECT * FROM projects_messages WHERE id = $1;",
			[id]
		);

		if (!message) {
			return null;
		}

		return new ProjectMessageDocument(message);
	}
}

export default ProjectMessageModel;
