import {PoolClient} from "pg";
import {TagFromDb} from "../../types/rows";
import TagDocument from "./TagDocument";
import {FindAllOptions} from "./types";

const findAll = async (
	client: PoolClient,
	opts: FindAllOptions = {}
): Promise<TagDocument[]> => {
	const {limit, offset} = opts;

	let query = "SELECT * FROM tag";

	if (limit) {
		query += ` LIMIT ${limit}`;
	}

	if (offset) {
		query += ` OFFSET ${offset}`;
	}

	const {rows} = await client.query<TagFromDb>(`${query};`);

	return rows.map(r => new TagDocument(r));
};

const countAll = async (client: PoolClient): Promise<number> => {
	const {
		rows: [{count}]
	} = await client.query<{count: string}>("SELECT COUNT(*) FROM tag;");

	return Number(count);
};

const findByName = async (
	client: PoolClient,
	name: TagFromDb["name"]
): Promise<TagDocument | null> => {
	const {
		rows: [tag]
	} = await client.query<TagFromDb>("SELECT * FROM tag WHERE name = $1;", [
		name
	]);

	return tag ? new TagDocument(tag) : null;
};

export default {findAll, countAll, findByName};
