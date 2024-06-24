import {PoolClient} from "pg";
import {ProjectRoleModel, ProjectTagModel, UserModel} from "../models";
import {PopulatedProjectDocument, ProjectDocument} from "../types";
import Populator from "./Populator";
import ProjectRolePopulator from "./ProjectRolePopulator";
import ProjectTagPopulator from "./ProjectTagPopulator";

class ProjectPopulator extends Populator<
	ProjectDocument,
	PopulatedProjectDocument
> {
	private tagPopulator: ProjectTagPopulator;
	private rolePopulator: ProjectRolePopulator;

	constructor(client: PoolClient) {
		super(client);
		this.tagPopulator = new ProjectTagPopulator(this.client);
		this.rolePopulator = new ProjectRolePopulator(this.client);
	}

	async populate(doc: ProjectDocument): Promise<PopulatedProjectDocument> {
		const {id, name, description, repoUrl, ownerUserId, createdAt, updatedAt} =
			doc;

		const userModel = new UserModel(this.client);
		const tagModel = new ProjectTagModel(this.client);
		const roleModel = new ProjectRoleModel(this.client);

		const [ownerUser, tags, roles] = await Promise.all([
			userModel.findById(ownerUserId),
			tagModel
				.findByProjectId(id)
				.then(docs => this.tagPopulator.populateMany(docs)),
			roleModel
				.findByProjectId(id)
				.then(docs => this.rolePopulator.populateMany(docs))
		]);

		return {
			id,
			name,
			description,
			repoUrl,
			createdAt,
			updatedAt,
			ownerUser: ownerUser!,
			tags,
			roles
		};
	}
}

export default ProjectPopulator;
