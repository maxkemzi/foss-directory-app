import Db from "../../Db";
import TagDocument from "./TagDocument";
import {TagFromDb} from "./types";

class TagModel {
	static async getAll(): Promise<TagDocument[]> {
		const {rows} = await Db.query<TagFromDb>("SELECT * FROM tags;");
		return rows.map(t => new TagDocument(t));
	}
}

export default TagModel;
