import {TagFromDb} from "#src/types/db";
import Db from "../Db";
import {TagDocument} from "../documents";

class TagModel {
	static async getAll(): Promise<TagDocument[]> {
		const {rows} = await Db.query<TagFromDb>("SELECT * FROM tag;");
		return rows.map(t => new TagDocument(t));
	}
}

export default TagModel;
