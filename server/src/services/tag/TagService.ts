import {Db, TagModel} from "#src/db";
import {TagDto} from "../dtos";
import {GetOptions, GetReturn} from "./types";

class TagService {
	static async getAll(opts: GetOptions): Promise<GetReturn> {
		const {limit, offset, search} = opts;

		const client = await Db.getInstance().getClient();
		const model = new TagModel(client);

		try {
			const [tags, totalCount] = await Promise.all([
				model.findAll({search, limit, offset}),
				model.countAll({search})
			]);

			return {tags: tags.map(t => new TagDto(t)), totalCount};
		} finally {
			client.release();
		}
	}
}

export default TagService;
