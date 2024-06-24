import {PoolClient} from "pg";
import {ProjectModel, ProjectRoleModel, UserModel} from "../models";
import {
	PopulatedProjectRequestDocument,
	ProjectRequestDocument
} from "../types";
import Populator from "./Populator";
import ProjectRolePopulator from "./ProjectRolePopulator";

class ProjectRequestPopulator extends Populator<
	ProjectRequestDocument,
	PopulatedProjectRequestDocument
> {
	private rolePopulator: ProjectRolePopulator;

	constructor(client: PoolClient) {
		super(client);
		this.rolePopulator = new ProjectRolePopulator(this.client);
	}

	async populate(
		doc: ProjectRequestDocument
	): Promise<PopulatedProjectRequestDocument> {
		const {id, createdAt, updatedAt, userId, projectRoleId, projectId} = doc;

		const userModel = new UserModel(this.client);
		const projectModel = new ProjectModel(this.client);
		const roleModel = new ProjectRoleModel(this.client);

		const [user, project, role] = await Promise.all([
			userModel.findById(userId),
			projectModel.findById(projectId),
			roleModel
				.findById(projectRoleId)
				.then(r => (r ? this.rolePopulator.populate(r) : r))
		]);

		return {
			id,
			createdAt,
			updatedAt,
			user: user!,
			project: project!,
			role: role!
		};
	}
}

export default ProjectRequestPopulator;
