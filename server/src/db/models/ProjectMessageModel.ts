import {ProjectMessageFromDb} from "#src/types/db";
import {ProjectMessagePayload} from "#src/types/db/models";
import Db from "../Db";
import {ProjectMessageDocument} from "../documents";

class ProjectMessageModel {
	static async create({
		projectId,
		senderId,
		text
	}: ProjectMessagePayload): Promise<ProjectMessageDocument> {
		const {
			rows: [contributor]
		} = await Db.query<Pick<ProjectMessageFromDb, "id">>(
			`
			SELECT id FROM projects_contributors
			WHERE project_id = $1 AND user_id = $2;
			`,
			[projectId, senderId]
		);

		const {rows} = await Db.query<ProjectMessageFromDb>(
			"INSERT INTO projects_messages(project_id, sender_id, text) VALUES($1, $2, $3) RETURNING *;",
			[projectId, contributor.id, text]
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
}

export default ProjectMessageModel;
