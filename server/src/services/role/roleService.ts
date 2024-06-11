import {roleModel, db} from "#src/db";
import {RoleDto} from "#src/dtos";
import {GetAllOptions, GetAllReturn} from "./types";

const getAll = async (opts: GetAllOptions): Promise<GetAllReturn> => {
	const {limit, offset, search} = opts;

	const client = await db.getClient();

	try {
		const [roles, totalCount] = await Promise.all([
			roleModel.findAll(client, {limit, offset, search}),
			roleModel.countAll(client, {search})
		]);

		return {roles: roles.map(r => new RoleDto(r)), totalCount};
	} finally {
		client.release();
	}
};

export default {getAll};
