import {PoolClient} from "pg";
import {RoleFromDb} from "../../types/rows";
import RoleDocument from "./RoleDocument";
import {FindAllOptions} from "./types";

const findAll = async (
	client: PoolClient,
	opts: FindAllOptions = {}
): Promise<RoleDocument[]> => {
	const {limit, offset} = opts;

	let query = "SELECT * FROM role";

	if (limit) {
		query += ` LIMIT ${limit}`;
	}

	if (offset) {
		query += ` OFFSET ${offset}`;
	}

	const {rows} = await client.query<RoleFromDb>(`${query};`);

	return rows.map(r => new RoleDocument(r));
};

const countAll = async (client: PoolClient): Promise<number> => {
	const {
		rows: [{count}]
	} = await client.query<{count: string}>("SELECT COUNT(*) FROM role;");

	return Number(count);
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

export default {findAll, countAll, findByName};
