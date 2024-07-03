import {TagService} from "#src/services";
import {calcOffset, setPaginationHeaders} from "../helpers";
import {GetAllParsedQuery, GetAllRequestHandler} from "./types";

class TagsController {
	static getAll: GetAllRequestHandler = async (req, res, next) => {
		try {
			const {page, limit, search} = req.query as GetAllParsedQuery;

			const offset = calcOffset(page, limit);

			const {tags, totalCount} = await TagService.getAll({
				limit,
				search,
				offset
			});

			setPaginationHeaders(res, {page, limit, totalCount});
			res.json(tags);
		} catch (e) {
			next(e);
		}
	};
}

export default TagsController;
