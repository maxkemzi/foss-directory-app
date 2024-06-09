import {db, tagModel} from "#src/db";
import {TagDto} from "#src/dtos";
import {GetAllOptions, GetAllReturn} from "./types";

const getAll = async (opts: GetAllOptions): Promise<GetAllReturn> => {
	const {limit, offset} = opts;

	const client = await db.getClient();

	try {
		const [tags, totalCount] = await Promise.all([
			tagModel.findAll(client, {limit, offset}),
			tagModel.countAll(client)
		]);

		return {tags: tags.map(t => new TagDto(t)), totalCount};
	} finally {
		client.release();
	}
};

export default {getAll};
