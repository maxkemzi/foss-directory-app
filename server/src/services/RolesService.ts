import {RoleModel} from "#src/db/models";
import {RoleDto} from "#src/dtos";

class RolesService {
	static async getAll(): Promise<RoleDto[]> {
		const roles = await RoleModel.getAll();
		return roles.map(r => new RoleDto(r));
	}
}

export default RolesService;
