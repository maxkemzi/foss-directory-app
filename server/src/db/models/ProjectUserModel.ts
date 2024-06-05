import {ProjectUserFromDb} from "#src/types/db";
import {ProjectUserPayload} from "#src/types/db/models";
import Db from "../Db";
import {ProjectUserDocument} from "../documents";

class ProjectUserModel {
	static async create({
		userId,
		projectId,
		projectRoleId
	}: ProjectUserPayload): Promise<ProjectUserDocument> {
		const {
			rows: [user]
		} = await Db.query<ProjectUserFromDb>(
			"INSERT INTO project_user_accounts(user_account_id, project_id, project_role_id) VALUES($1, $2, $3) RETURNING *;",
			[userId, projectId, projectRoleId]
		);
		return new ProjectUserDocument(user);
	}

	static async getByProjectId(
		projectId: string
	): Promise<ProjectUserDocument[]> {
		const {rows: users} = await Db.query<ProjectUserFromDb>(
			"SELECT * FROM project_user_accounts WHERE project_id = $1;",
			[projectId]
		);
		return users.map(u => new ProjectUserDocument(u));
	}

	static async delete({
		projectId,
		userId
	}: {
		projectId: string;
		userId: string;
	}): Promise<void> {
		await Db.query(
			"DELETE FROM project_user_accounts WHERE project_id = $1 AND user_account_id = $2;",
			[projectId, userId]
		);
	}
}

export default ProjectUserModel;
