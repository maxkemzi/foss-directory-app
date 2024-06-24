import {PoolClient} from "pg";
import {ProjectModel, ProjectRoleModel, UserModel} from "../models";
import {
	PopulatedProjectMessageDocument,
	ProjectMessageDocument
} from "../types";
import Populator from "./Populator";
import ProjectRolePopulator from "./ProjectRolePopulator";

class ProjectMessagePopulator extends Populator<
	ProjectMessageDocument,
	PopulatedProjectMessageDocument
> {
	private rolePopulator: ProjectRolePopulator;

	constructor(client: PoolClient) {
		super(client);
		this.rolePopulator = new ProjectRolePopulator(this.client);
	}

	async populate(
		doc: ProjectMessageDocument
	): Promise<PopulatedProjectMessageDocument> {
		const {
			id,
			text,
			type,
			isSequential,
			createdAt,
			updatedAt,
			projectId,
			userId
		} = doc;

		const projectModel = new ProjectModel(this.client);
		const roleModel = new ProjectRoleModel(this.client);
		const userModel = new UserModel(this.client);

		const [project, sender] = await Promise.all([
			projectModel.findById(projectId),
			userId
				? (async () => {
						const [user, role, isOwner] = await Promise.all([
							userModel.findById(userId),
							roleModel
								.findByProjectAndUserIds(projectId, userId)
								.then(d => (d ? this.rolePopulator.populate(d) : null)),
							userModel.isProjectOwner(projectId, userId)
						]);

						return {user: user!, role, isOwner: isOwner!};
					})()
				: null
		]);

		return {
			id,
			text,
			type,
			isSequential,
			createdAt,
			updatedAt,
			project: project!,
			sender
		};
	}
}

export default ProjectMessagePopulator;
