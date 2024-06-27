import {ErrorFactory} from "#src/lib";
import {ProjectMessageService} from "#src/services";
import {Header} from "../../constants";
import {calcOffset, calcTotalPages} from "../../helpers";
import {GetByProjectIdParsedQuery, GetByProjectIdRequestHandler} from "./types";

class ProjectMessagesController {
	static getByProjectId: GetByProjectIdRequestHandler = async (
		req,
		res,
		next
	) => {
		try {
			const userId = res.locals.user?.id;
			if (!userId) {
				throw ErrorFactory.getUnauthorized();
			}

			const {id} = req.params;
			const {page, limit} = req.query as GetByProjectIdParsedQuery;

			const offset = calcOffset(page, limit);

			const {messages, totalCount} = await ProjectMessageService.getByProjectId(
				id,
				userId,
				{limit, offset}
			);

			res.set({
				[Header.TOTAL_COUNT]: totalCount,
				[Header.PAGE]: page,
				[Header.PAGE_LIMIT]: limit,
				[Header.TOTAL_PAGES]: calcTotalPages(totalCount, limit)
			});
			res.json(messages);
		} catch (e) {
			next(e);
		}
	};
}

export default ProjectMessagesController;
