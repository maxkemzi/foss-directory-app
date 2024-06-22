import {PoolClient} from "pg";
import Document from "../../lib/Document";
import {
	PopulatableDocument,
	PopulatedProjectDocument,
	ProjectDocument as ProjectDocumentType
} from "../../types/documents";
import {ProjectFromDb} from "../../types/rows";
import projectRoleModel from "../projectRole/projectRoleModel";
import projectTagModel from "../projectTag/projectTagModel";
import userModel from "../user/userModel";

class ProjectDocument
	extends Document<ProjectDocumentType>
	implements PopulatableDocument<PopulatedProjectDocument>
{
	ownerUserId: ProjectDocumentType["ownerUserId"];
	name: ProjectDocumentType["name"];
	description: ProjectDocumentType["description"];
	repoUrl: ProjectDocumentType["repoUrl"];

	constructor(obj: ProjectFromDb) {
		super(obj);
		this.ownerUserId = obj.owner_user_account_id;
		this.name = obj.name;
		this.description = obj.description;
		this.repoUrl = obj.repo_url;
	}

	toObject(): ProjectDocumentType {
		return {
			...super.toObject(),
			ownerUserId: this.ownerUserId,
			name: this.name,
			description: this.description,
			repoUrl: this.repoUrl
		};
	}

	async populate(client: PoolClient): Promise<PopulatedProjectDocument> {
		const {id, ownerUserId} = this;

		const [ownerUser, tags, roles] = await Promise.all([
			userModel.findById(client, ownerUserId),
			projectTagModel
				.findByProjectId(client, id)
				.then(result => Promise.all(result.map(pt => pt.populate(client)))),
			projectRoleModel
				.findByProjectId(client, id)
				.then(result => Promise.all(result.map(pr => pr.populate(client))))
		]);

		return {
			...this.toObject(),
			ownerUser: ownerUser!,
			tags,
			roles
		};
	}
}

export default ProjectDocument;
