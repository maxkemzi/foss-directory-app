import {PoolClient} from "pg";
import {TagFromDb} from "../../types/rows";
import TagDocument from "./TagDocument";

const findAll = async (client: PoolClient): Promise<TagDocument[]> => {
	const {rows} = await client.query<TagFromDb>("SELECT * FROM tag;");

	return rows.map(r => new TagDocument(r));
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

export default {findAll, findByName};
