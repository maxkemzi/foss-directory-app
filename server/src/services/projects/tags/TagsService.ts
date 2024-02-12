import {TagModel} from "#src/db/models";
import {TagDto} from "#src/dtos";

class TagsService {
	static async getAll(): Promise<TagDto[]> {
		const tags = await TagModel.getAll();
		return tags.map(t => new TagDto(t));
	}
}

export default TagsService;
