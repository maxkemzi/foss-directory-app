import {TagService} from "#src/services";
import {Header} from "../constants";
import {calcOffset, calcTotalPages} from "../helpers";
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

			res.set({
				[Header.TOTAL_COUNT]: totalCount,
				[Header.PAGE]: page,
				[Header.PAGE_LIMIT]: limit,
				[Header.TOTAL_PAGES]: calcTotalPages(totalCount, limit)
			});
			res.json(tags);
		} catch (e) {
			next(e);
		}
	};
}

export default TagsController;
