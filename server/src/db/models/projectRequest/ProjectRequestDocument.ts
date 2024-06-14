import {PoolClient} from "pg";
import Document from "../../lib/Document";
import {
	PopulatableDocument,
	PopulatedProjectRequestDocument,
	ProjectRequestDocument as ProjectRequestDocumentType
} from "../../types/documents";
import {
	ProjectFromDb,
	ProjectRequestFromDb,
	RoleFromDb,
	UserFromDb
} from "../../types/rows";
import ProjectDocument from "../project/ProjectDocument";
import RoleDocument from "../role/RoleDocument";
import UserDocument from "../user/UserDocument";

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
		const {userId, projectRoleId} = this;

		const [userResult, projectResult, roleResult] = await Promise.all([
			client.query<UserFromDb>("SELECT * FROM user_account WHERE id = $1;", [
				userId
			]),
			client.query<ProjectFromDb>(
				`
				SELECT p.*
				FROM project_roles pr
				JOIN project p ON pr.project_id = p.id
				WHERE pr.id = $1;
				`,
				[projectRoleId]
			),
			client.query<RoleFromDb & {places_available: number}>(
				`
				SELECT *
				FROM (
					SELECT pr.id, r.name, pr.places_available, pr.created_at, pr.updated_at
					FROM project_roles pr
					JOIN role r ON pr.role_id = r.id
					WHERE pr.id = $1 AND pr.places_available > 0
					UNION ALL
					SELECT id, name, places_available, created_at, updated_at
					FROM project_roles
					WHERE id = $1 AND role_id IS NULL AND places_available > 0
				);
			`,
				[projectRoleId]
			)
		]);

		return {
			...this.toObject(),
			user: new UserDocument(userResult.rows[0]).toObject(),
			project: new ProjectDocument(projectResult.rows[0]).toObject(),
			role: {
				...new RoleDocument(roleResult.rows[0]).toObject(),
				placesAvailable: roleResult.rows[0].places_available
			}
		};
	}
}

export default ProjectRequestDocument;
