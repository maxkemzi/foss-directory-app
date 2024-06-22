import {PoolClient} from "pg";
import Document from "../../lib/Document";
import {
	PopulatableDocument,
	PopulatedProjectRequestDocument,
	ProjectRequestDocument as ProjectRequestDocumentType
} from "../../types/documents";
import {ProjectRequestFromDb} from "../../types/rows";
import projectModel from "../project/projectModel";
import projectRoleModel from "../projectRole/projectRoleModel";
import userModel from "../user/userModel";

class ProjectRequestDocument
	extends Document<ProjectRequestDocumentType>
	implements PopulatableDocument<PopulatedProjectRequestDocument>
{
	userId: ProjectRequestDocumentType["userId"];
	projectId: ProjectRequestDocumentType["projectId"];
	projectRoleId: ProjectRequestDocumentType["projectRoleId"];

	constructor(obj: ProjectRequestFromDb) {
		super(obj);
		this.userId = obj.user_account_id;
		this.projectId = obj.project_id;
		this.projectRoleId = obj.project_role_id;
	}

	toObject(): ProjectRequestDocumentType {
		return {
			...super.toObject(),
			userId: this.userId,
			projectId: this.projectId,
			projectRoleId: this.projectRoleId
		};
	}

	async populate(client: PoolClient): Promise<PopulatedProjectRequestDocument> {
		const {userId, projectRoleId, projectId} = this;

		const [user, project, role] = await Promise.all([
			userModel.findById(client, userId),
			projectModel.findById(client, projectId),
			projectRoleModel
				.findById(client, projectRoleId)
				.then(r => (r ? r.populate(client) : r))
		]);

		return {
			...this.toObject(),
			user: user!,
			project: project!,
			role: role!
		};
	}
}

export default ProjectRequestDocument;
