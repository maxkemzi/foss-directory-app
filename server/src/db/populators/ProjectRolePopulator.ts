import {
	PopulatedProjectRoleDocument,
	ProjectRoleDocument,
	ProjectRoleFromDb,
	RoleFromDb
} from "../types";
import Populator from "./Populator";

class ProjectRolePopulator extends Populator<
	ProjectRoleDocument,
	PopulatedProjectRoleDocument
> {
	async populate(
		doc: ProjectRoleDocument
	): Promise<PopulatedProjectRoleDocument> {
		const {id} = doc;

		const {
			rows: [role]
		} = await this.client.query<
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

export default ProjectRolePopulator;
