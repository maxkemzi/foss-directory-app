import {PoolClient} from "pg";
import {RoleFromDb} from "../../types/rows";
import RoleDocument from "./RoleDocument";

const findAll = async (client: PoolClient): Promise<RoleDocument[]> => {
	const {rows} = await client.query<RoleFromDb>("SELECT * FROM role;");

	return rows.map(r => new RoleDocument(r));
};

const findByName = async (
	client: PoolClient,
	name: RoleFromDb["name"]
): Promise<RoleDocument | null> => {
	const {
		rows: [role]
	} = await client.query<RoleFromDb>("SELECT * FROM role WHERE name = $1;", [
		name
	]);

	return role ? new RoleDocument(role) : null;
};

export default {findAll, findByName};
