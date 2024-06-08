import {tagModel, db} from "#src/db";
import {TagDto} from "#src/dtos";

const getAll = async (): Promise<TagDto[]> => {
	const client = await db.getClient();

	try {
		const tags = await tagModel.findAll(client);

		return tags.map(t => new TagDto(t));
	} finally {
		client.release();
	}
};

export default {getAll};
