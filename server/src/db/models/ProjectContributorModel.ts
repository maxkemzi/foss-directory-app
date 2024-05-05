import {ProjectContributorFromDb} from "#src/types/db";
import {ProjectContributorPayload} from "#src/types/db/models";
import Db from "../Db";
import {ProjectContributorDocument} from "../documents";

class ProjectContributorModel {
	static async create({
		projectId,
		contributorId
	}: ProjectContributorPayload): Promise<ProjectContributorDocument> {
		const {
			rows: [contributor]
		} = await Db.query<ProjectContributorFromDb>(
			"INSERT INTO projects_contributors (project_id, contributor_id) VALUES ($1, $2) RETURNING *;",
			[projectId, contributorId]
		);
		return new ProjectContributorDocument(contributor);
	}
}

export default ProjectContributorModel;
