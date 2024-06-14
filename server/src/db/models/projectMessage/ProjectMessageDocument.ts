import {PoolClient, QueryResult} from "pg";
import Document from "../../lib/Document";
import {
	PopulatableDocument,
	PopulatedProjectMessageDocument,
	ProjectMessageDocument as ProjectMessageDocumentType
} from "../../types/documents";
import {
	ProjectFromDb,
	ProjectMessageFromDb,
	RoleFromDb,
	UserFromDb
} from "../../types/rows";
import ProjectDocument from "../project/ProjectDocument";
import RoleDocument from "../role/RoleDocument";
import UserDocument from "../user/UserDocument";

class ProjectMessageDocument
	extends Document<ProjectMessageDocumentType>
	implements PopulatableDocument<PopulatedProjectMessageDocument>
{
	projectId: ProjectMessageDocumentType["projectId"];
	userId: ProjectMessageDocumentType["userId"];
	text: ProjectMessageDocumentType["text"];
	type: ProjectMessageDocumentType["type"];

	constructor(obj: ProjectMessageFromDb) {
		super(obj);
		this.projectId = obj.project_id;
		this.userId = obj.user_account_id;
		this.text = obj.text;
		this.type = obj.type;
	}

	toObject(): ProjectMessageDocumentType {
		return {
			...super.toObject(),
			projectId: this.projectId,
			userId: this.userId,
			text: this.text,
			type: this.type
		};
	}

	async populate(client: PoolClient): Promise<PopulatedProjectMessageDocument> {
		const {projectId, userId} = this;

		const queries: Promise<QueryResult>[] = [
			client.query<ProjectFromDb>("SELECT * FROM project WHERE id = $1;", [
				projectId
			])
		];

		if (userId) {
			queries.push(
				client.query<UserFromDb>(`SELECT * FROM user_account WHERE id = $1;`, [
					userId
				])
			);
			queries.push(
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
			);
			queries.push(
				client.query<{is_owner: boolean}>(
					`
				SELECT pua.is_owner
				FROM project_user_accounts pua
				JOIN user_account u ON pua.user_account_id = u.id
				WHERE u.id = $1;
				`,
					[userId]
				)
			);
		}

		const [projectResult, userResult, roleResult, isOwnerResult] =
			await Promise.all(queries);

		return {
			...this.toObject(),
			project: new ProjectDocument(projectResult.rows[0]).toObject(),
			sender: userId
				? {
						user: new UserDocument(userResult.rows[0]).toObject(),
						role: roleResult.rows[0]
							? new RoleDocument(roleResult.rows[0]).toObject()
							: null,
						isOwner: isOwnerResult.rows[0]
							? isOwnerResult.rows[0].is_owner
							: false
					}
				: null
		};
	}
}

export default ProjectMessageDocument;
