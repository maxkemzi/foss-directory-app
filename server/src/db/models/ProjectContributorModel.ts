import {ProjectContributorFromDb} from "#src/types/db";
import {ProjectContributorPayload} from "#src/types/db/models";
import Db from "../Db";
import {ProjectContributorDocument} from "../documents";

class ProjectContributorModel {
	static async create({
		userId,
		projectId,
		projectRoleId
	}: ProjectContributorPayload): Promise<ProjectContributorDocument> {
		const {
			rows: [contributor]
		} = await Db.query<ProjectContributorFromDb>(
			"INSERT INTO projects_contributors(user_id, project_id, project_role_id) VALUES($1, $2, $3) RETURNING *;",
			[userId, projectId, projectRoleId]
		);
		return new ProjectContributorDocument(contributor);
	}

	static async delete({
		projectId,
		userId
	}: {
		projectId: string;
		userId: string;
	}): Promise<void> {
		await Db.query(
			"DELETE FROM projects_contributors WHERE project_id = $1 AND user_id = $2;",
			[projectId, userId]
		);
	}
}

export default ProjectContributorModel;
