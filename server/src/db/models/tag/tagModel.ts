import {PoolClient} from "pg";
import {TagFromDb} from "../../types/rows";
import TagDocument from "./TagDocument";
import {CountAllOptions, FindAllOptions} from "./types";
import {createSearchCondition} from "../project/helpers";

const findAll = async (
	client: PoolClient,
	opts: FindAllOptions = {}
): Promise<TagDocument[]> => {
	const {limit, offset, search} = opts;

	let query = "SELECT * FROM tag";

	if (search) {
		query += ` WHERE ${createSearchCondition(search, ["name"])}`;
	}

	query += ` ORDER BY created_at DESC, serial_id DESC`;

	if (limit) {
		query += ` LIMIT ${limit}`;
	}

	if (offset) {
		query += ` OFFSET ${offset}`;
	}

	const {rows} = await client.query<TagFromDb>(`${query};`);

	return rows.map(r => new TagDocument(r));
};

const countAll = async (
	client: PoolClient,
	opts: CountAllOptions = {}
): Promise<number> => {
	const {search} = opts;

	let query = "SELECT COUNT(*) FROM tag";

	if (search) {
		query += ` WHERE ${createSearchCondition(search, ["name"])}`;
	}

	const {
		rows: [{count}]
	} = await client.query<{count: string}>(`${query};`);

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
