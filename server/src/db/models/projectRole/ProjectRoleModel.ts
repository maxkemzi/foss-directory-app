import {ProjectRoleDocument} from "#src/db/documents";
import {
	ProjectDocument,
	ProjectRoleDocument as ProjectRoleDocumentType,
	ProjectRoleFromDb,
	ProjectRolePayload,
	UserDocument
} from "#src/db/types";
import Model from "../Model";
import {ProjectRoleModelImpl} from "./types";

class ProjectRoleModel extends Model implements ProjectRoleModelImpl {
	async insert(payload: ProjectRolePayload) {
		const {projectId, roleId, name, placesAvailable = 0} = payload;

		const {
			rows: [role]
		} = await (roleId
			? this.client.query<ProjectRoleFromDb>(
					"INSERT INTO project_roles(project_id, role_id, places_available, is_custom) VALUES($1, $2, $3, $4) RETURNING *;",
					[projectId, roleId, placesAvailable, false]
				)
			: this.client.query<ProjectRoleFromDb>(
					"INSERT INTO project_roles(project_id, name, places_available, is_custom) VALUES($1, $2, $3, $4) RETURNING *;",
					[projectId, name, placesAvailable, true]
				));

		return new ProjectRoleDocument(role);
	}

	async findById(id: ProjectRoleDocumentType["id"]) {
		const {
			rows: [role]
		} = await this.client.query<ProjectRoleFromDb>(
			"SELECT * FROM project_roles WHERE id = $1;",
			[id]
		);

		return role ? new ProjectRoleDocument(role) : null;
	}

	async findByProjectId(id: ProjectDocument["id"]) {
		const {rows} = await this.client.query<ProjectRoleFromDb>(
			"SELECT * FROM project_roles WHERE project_id = $1 AND places_available > 0 ORDER BY created_at ASC, serial_id ASC;",
			[id]
		);

		return rows.map(r => new ProjectRoleDocument(r));
	}

	async findByProjectAndUserIds(
		projectId: ProjectDocument["id"],
		userId: UserDocument["id"]
	) {
		const {
			rows: [role]
		} = await this.client.query<ProjectRoleFromDb>(
			`
				SELECT pr.* FROM project_roles pr
				JOIN project_user_accounts pua ON pua.project_role_id = pr.id
				WHERE pr.project_id = $1 AND pua.user_account_id = $2 ORDER BY created_at ASC, serial_id ASC;
				`,
			[projectId, userId]
		);

		return role ? new ProjectRoleDocument(role) : null;
	}
}

export default ProjectRoleModel;
