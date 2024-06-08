import {roleModel, db} from "#src/db";
import {RoleDto} from "#src/dtos";

const getAll = async (): Promise<RoleDto[]> => {
	const client = await db.getClient();

	try {
		const roles = await roleModel.findAll(client);

		return roles.map(r => new RoleDto(r));
	} finally {
		client.release();
	}
};

export default {getAll};
