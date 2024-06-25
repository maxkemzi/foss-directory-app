import {Db, RoleModel} from "#src/db";
import {RoleDto} from "../dtos";
import {GetOptions, GetReturn} from "./types";

class RoleService {
	static async getAll(opts: GetOptions): Promise<GetReturn> {
		const {limit, offset, search} = opts;

		const client = await Db.getClient();
		const model = new RoleModel(client);

		try {
			const [roles, totalCount] = await Promise.all([
				model.findAll({limit, offset, search}),
				model.countAll({search})
			]);

			return {roles: roles.map(r => new RoleDto(r)), totalCount};
		} finally {
			client.release();
		}
	}
}

export default RoleService;
