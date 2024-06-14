import {PoolClient, QueryResult} from "pg";
import Document from "../../lib/Document";
import {
	PopulatableDocument,
	PopulatedProjectUserDocument,
	ProjectUserDocument as ProjectUserDocumentType
} from "../../types/documents";
import {ProjectUserFromDb, RoleFromDb, UserFromDb} from "../../types/rows";
import RoleDocument from "../role/RoleDocument";
import UserDocument from "../user/UserDocument";

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

		const queries: Promise<QueryResult>[] = [
			client.query<UserFromDb>("SELECT * FROM user_account WHERE id = $1;", [
				userId
			]),
			client.query<RoleFromDb>(
				`
				SELECT *
				FROM (
					SELECT pr.id, r.name, pr.created_at, pr.updated_at
					FROM project_user_accounts pua
					JOIN project_roles pr ON pua.project_role_id = pr.id
					JOIN role r ON pr.role_id = r.id
					WHERE pua.project_id = $1 AND pua.user_account_id = $2
					UNION ALL
					SELECT pr.id, pr.name, pr.created_at, pr.updated_at
					FROM project_user_accounts pua
					JOIN project_roles pr ON pua.project_role_id = pr.id
					WHERE pua.project_id = $1 AND pua.user_account_id = $2 AND pr.role_id IS NULL
				);
				`,
				[projectId, userId]
			)
		];

		const [userResult, roleResult] = await Promise.all(queries);

		return {
			...this.toObject(),
			user: new UserDocument(userResult.rows[0]).toObject(),
			role: new RoleDocument(roleResult.rows[0]).toObject()
		};
	}
}

export default ProjectUserDocument;
