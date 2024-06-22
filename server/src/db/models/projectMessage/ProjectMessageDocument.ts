import {PoolClient} from "pg";
import Document from "../../lib/Document";
import {
	PopulatableDocument,
	PopulatedProjectMessageDocument,
	ProjectMessageDocument as ProjectMessageDocumentType
} from "../../types/documents";
import {ProjectMessageFromDb} from "../../types/rows";
import projectModel from "../project/projectModel";
import projectRoleModel from "../projectRole/projectRoleModel";
import userModel from "../user/userModel";

class ProjectMessageDocument
	extends Document<ProjectMessageDocumentType>
	implements PopulatableDocument<PopulatedProjectMessageDocument>
{
	projectId: ProjectMessageDocumentType["projectId"];
	userId: ProjectMessageDocumentType["userId"];
	text: ProjectMessageDocumentType["text"];
	type: ProjectMessageDocumentType["type"];
	isSequential: ProjectMessageDocumentType["isSequential"];

	constructor(obj: ProjectMessageFromDb) {
		super(obj);
		this.projectId = obj.project_id;
		this.userId = obj.user_account_id;
		this.text = obj.text;
		this.type = obj.type;
		this.isSequential = obj.is_sequential;
	}

	toObject(): ProjectMessageDocumentType {
		return {
			...super.toObject(),
			projectId: this.projectId,
			userId: this.userId,
			text: this.text,
			type: this.type,
			isSequential: this.isSequential
		};
	}

	async populate(client: PoolClient): Promise<PopulatedProjectMessageDocument> {
		const {projectId, userId} = this;

		const [project, sender] = await Promise.all([
			projectModel.findById(client, projectId),
			userId
				? (async () => {
						const [user, role, isOwner] = await Promise.all([
							userModel.findById(client, userId),
							projectRoleModel
								.findByProjectAndUserIds(client, projectId, userId)
								.then(r => (r ? r.populate(client) : null)),
							userModel.isProjectOwner(client, {projectId, userId})
						]);

						return {user: user!, role, isOwner: isOwner!};
					})()
				: null
		]);

		return {
			...this.toObject(),
			project: project!,
			sender
		};
	}
}

export default ProjectMessageDocument;
