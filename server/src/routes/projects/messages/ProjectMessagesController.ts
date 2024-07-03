import {ErrorFactory} from "#src/lib";
import {ProjectMessageService} from "#src/services";
import {calcOffset, setPaginationHeaders} from "../../helpers";
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

			setPaginationHeaders(res, {page, limit, totalCount});
			res.json(messages);
		} catch (e) {
			next(e);
		}
	};
}

export default ProjectMessagesController;
