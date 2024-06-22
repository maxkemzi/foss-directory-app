import {PoolClient} from "pg";
import Document from "../../lib/Document";
import {
	PopulatableDocument,
	PopulatedProjectRoleDocument,
	ProjectRoleDocument as ProjectRoleDocumentType
} from "../../types/documents";
import {ProjectRoleFromDb, RoleFromDb} from "../../types/rows";

class ProjectRoleDocument
	extends Document<ProjectRoleDocumentType>
	implements PopulatableDocument<PopulatedProjectRoleDocument>
{
	projectId: ProjectRoleDocumentType["projectId"];
	roleId: ProjectRoleDocumentType["roleId"];
	name: ProjectRoleDocumentType["name"];
	placesAvailable: ProjectRoleDocumentType["placesAvailable"];
	isCustom: ProjectRoleDocumentType["isCustom"];

	constructor(obj: ProjectRoleFromDb) {
		super(obj);
		this.projectId = obj.project_id;
		this.roleId = obj.role_id;
		this.name = obj.name;
		this.placesAvailable = obj.places_available;
		this.isCustom = obj.is_custom;
	}

	toObject(): ProjectRoleDocumentType {
		return {
			...super.toObject(),
			projectId: this.projectId,
			roleId: this.roleId,
			name: this.name,
			placesAvailable: this.placesAvailable,
			isCustom: this.isCustom
		};
	}

	async populate(client: PoolClient): Promise<PopulatedProjectRoleDocument> {
		const {id} = this;

		const {
			rows: [role]
		} = await client.query<
			RoleFromDb & {places_available: ProjectRoleFromDb["places_available"]}
		>(
			`
			SELECT pr.id, COALESCE(r.name, pr.name) as name, pr.places_available, pr.created_at, pr.updated_at
			FROM project_roles pr
    	LEFT JOIN role r ON pr.role_id = r.id
			WHERE pr.id = $1;
		`,
			[id]
		);

		return {
			id: role.id,
			name: role.name,
			placesAvailable: role.places_available,
			createdAt: role.created_at,
			updatedAt: role.updated_at
		};
	}
}

export default ProjectRoleDocument;
