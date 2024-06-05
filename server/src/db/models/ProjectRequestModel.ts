import {ProjectRequestFromDb} from "#src/types/db";
import {ProjectRequestPayload} from "#src/types/db/models";
import Db from "../Db";
import {ProjectRequestDocument} from "../documents";

class ProjectRequestModel {
	static async create({
		userId,
		projectId,
		projectRoleId
	}: ProjectRequestPayload): Promise<ProjectRequestDocument> {
		const {
			rows: [request]
		} = await Db.query<ProjectRequestFromDb>(
			"INSERT INTO project_requests(user_account_id, project_id, project_role_id) VALUES($1, $2, $3) RETURNING *;",
			[userId, projectId, projectRoleId]
		);
		return new ProjectRequestDocument(request);
	}

	static async getAllByRequestedId(
		requestedId: string
	): Promise<ProjectRequestDocument[]> {
		const {rows} = await Db.query<ProjectRequestFromDb>(
			`
			SELECT pr.* FROM project_requests pr
			JOIN project p ON pr.project_id = p.id
			WHERE p.owner_user_account_id = $1;
			`,
			[requestedId]
		);
		return rows.map(pr => new ProjectRequestDocument(pr));
	}

	static async accept(id: string): Promise<void> {
		const client = await Db.connect();

		try {
			await client.query("BEGIN");

			const {
				rows: [request]
			} = await client.query<ProjectRequestFromDb>(
				"SELECT * FROM project_requests WHERE id = $1;",
				[id]
			);

			await client.query(
				"INSERT INTO project_user_accounts(user_account_id, project_id, project_role_id) VALUES($1, $2, $3);",
				[request.user_account_id, request.project_id, request.project_role_id]
			);

			await client.query("DELETE FROM project_requests WHERE id = $1;", [id]);

			await client.query("COMMIT");
		} catch (e) {
			await client.query("ROLLBACK");
			throw e;
		} finally {
			client.release();
		}
	}

	static async reject(id: string): Promise<void> {
		await Db.query<ProjectRequestFromDb>(
			"DELETE FROM project_requests WHERE id=$1;",
			[id]
		);
	}
}

export default ProjectRequestModel;
