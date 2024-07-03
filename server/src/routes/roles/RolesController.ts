import {RoleService} from "#src/services";
import {calcOffset, setPaginationHeaders} from "../helpers";
import {GetAllParsedQuery, GetAllRequestHandler} from "./types";

class RolesController {
	static getAll: GetAllRequestHandler = async (req, res, next) => {
		try {
			const {page, limit, search} = req.query as GetAllParsedQuery;

			const offset = calcOffset(page, limit);

			const {roles, totalCount} = await RoleService.getAll({
				limit,
				search,
				offset
			});

			setPaginationHeaders(res, {page, limit, totalCount});
			res.json(roles);
		} catch (e) {
			next(e);
		}
	};
}

export default RolesController;
