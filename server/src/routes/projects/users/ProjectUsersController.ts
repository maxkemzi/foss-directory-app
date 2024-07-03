import {ErrorFactory} from "#src/lib";
import {calcOffset, setPaginationHeaders} from "#src/routes/helpers";
import {ProjectUserService} from "#src/services";
import {GetByProjectIdParsedQuery, GetByProjectIdRequestHandler} from "./types";

class ProjectUsersController {
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

			const {users, totalCount} = await ProjectUserService.getByProjectId(
				id,
				userId,
				{limit, offset}
			);

			setPaginationHeaders(res, {page, limit, totalCount});
			res.json(users);
		} catch (e) {
			next(e);
		}
	};
}

export default ProjectUsersController;
