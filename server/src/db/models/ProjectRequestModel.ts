import {ProjectRequestFromDb, ProjectRoleFromDb} from "#src/types/db";
import {ProjectRequestPayload} from "#src/types/db/models";
import Db from "../Db";
import {ProjectRequestDocument} from "../documents";

class ProjectRequestModel {
	static async create({
		requestorId,
		projectRoleId
	}: ProjectRequestPayload): Promise<ProjectRequestDocument> {
		const {
			rows: [request]
		} = await Db.query<ProjectRequestFromDb>(
			"INSERT INTO projects_requests(requestor_id, project_role_id) VALUES($1, $2) RETURNING *;",
			[requestorId, projectRoleId]
		);
		return new ProjectRequestDocument(request);
	}

	static async getAllByRequestedId(
		requestedId: number
	): Promise<ProjectRequestDocument[]> {
		const {rows} = await Db.query<ProjectRequestFromDb>(
			`
			SELECT prr.* FROM projects_requests prr
			LEFT JOIN projects_roles pr ON prr.project_role_id = pr.id
			LEFT JOIN projects p ON pr.project_id = p.id
			WHERE p.owner_id = $1;
			`,
			[requestedId]
		);
		return rows.map(prr => new ProjectRequestDocument(prr));
	}

	static async accept(id: number): Promise<void> {
		const client = await Db.connect();

		try {
			await client.query("BEGIN");

			const {
				rows: [request]
			} = await client.query<ProjectRequestFromDb>(
				"SELECT * FROM projects_requests WHERE id = $1;",
				[id]
			);

			const {
				rows: [role]
			} = await client.query<ProjectRoleFromDb>(
				"SELECT * FROM projects_roles WHERE id = $1;",
				[request.project_role_id]
			);

			await client.query(
				"INSERT INTO projects_contributors (project_role_id, contributor_id) VALUES ($1, $2);",
				[request.project_role_id, request.requestor_id]
			);

			await Promise.all([
				client.query("DELETE FROM projects_requests WHERE id = $1;", [id]),
				client.query("UPDATE projects_roles SET count = $1 WHERE id = $2;", [
					role.count - 1,
					role.id
				])
			]);

			await client.query("COMMIT");
		} catch (e) {
			await client.query("ROLLBACK");
			throw e;
		} finally {
			client.release();
		}
	}

	static async reject(id: number): Promise<void> {
		await Db.query<ProjectRequestFromDb>(
			"DELETE FROM projects_requests WHERE id = $1;",
			[id]
		);
	}
}

export default ProjectRequestModel;
