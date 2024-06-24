import {PoolClient} from "pg";
import {ProjectRoleModel, UserModel} from "../models";
import {PopulatedProjectUserDocument, ProjectUserDocument} from "../types";
import Populator from "./Populator";
import ProjectRolePopulator from "./ProjectRolePopulator";

class ProjectUserPopulator extends Populator<
	ProjectUserDocument,
	PopulatedProjectUserDocument
> {
	private rolePopulator: ProjectRolePopulator;

	constructor(client: PoolClient) {
		super(client);
		this.rolePopulator = new ProjectRolePopulator(this.client);
	}

	async populate(
		doc: ProjectUserDocument
	): Promise<PopulatedProjectUserDocument> {
		const {id, isOwner, createdAt, updatedAt, projectId, userId} = doc;

		const userModel = new UserModel(this.client);
		const roleModel = new ProjectRoleModel(this.client);

		const [user, role] = await Promise.all([
			userModel.findById(userId),
			roleModel
				.findByProjectAndUserIds(projectId, userId)
				.then(r => (r ? this.rolePopulator.populate(r) : null))
		]);

		return {
			user: user!,
			role: role!,
			id,
			isOwner,
			createdAt,
			updatedAt
		};
	}
}

export default ProjectUserPopulator;
