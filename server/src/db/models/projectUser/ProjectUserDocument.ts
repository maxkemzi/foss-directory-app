import {PoolClient} from "pg";
import Document from "../../lib/Document";
import {
	PopulatableDocument,
	PopulatedProjectUserDocument,
	ProjectUserDocument as ProjectUserDocumentType
} from "../../types/documents";
import {ProjectUserFromDb} from "../../types/rows";
import projectRoleModel from "../projectRole/projectRoleModel";
import userModel from "../user/userModel";

class ProjectUserDocument
	extends Document<ProjectUserDocumentType>
	implements PopulatableDocument<PopulatedProjectUserDocument>
{
	userId: ProjectUserDocumentType["userId"];
	projectId: ProjectUserDocumentType["projectId"];
	projectRoleId: ProjectUserDocumentType["projectRoleId"];
	isOwner: ProjectUserDocumentType["isOwner"];

	constructor(obj: ProjectUserFromDb) {
		super(obj);
		this.userId = obj.user_account_id;
		this.projectId = obj.project_id;
		this.projectRoleId = obj.project_role_id;
		this.isOwner = obj.is_owner;
	}

	toObject(): ProjectUserDocumentType {
		return {
			...super.toObject(),
			userId: this.userId,
			projectId: this.projectId,
			projectRoleId: this.projectRoleId,
			isOwner: this.isOwner
		};
	}

	async populate(client: PoolClient): Promise<PopulatedProjectUserDocument> {
		const {projectId, userId} = this;

		const [user, role] = await Promise.all([
			userModel.findById(client, userId),
			projectRoleModel
				.findByProjectAndUserIds(client, projectId, userId)
				.then(r => (r ? r.populate(client) : null))
		]);

		return {
			...this.toObject(),
			user: user!,
			role: role!
		};
	}
}

export default ProjectUserDocument;
