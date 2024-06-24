import {ApiError} from "#src/lib";
import {RoleService} from "#src/services";
import {
	Header,
	calcOffset,
	calcTotalPages,
	parseLimitString,
	parsePageString,
	parseSearchString
} from "#src/utils";
import {NextFunction, Request, Response} from "express";

class RolesController {
	static async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const {page, limit, search} = req.query;

			if (page && typeof page !== "string") {
				throw new ApiError(400, '"page" param must be a string');
			}

			if (limit && typeof limit !== "string") {
				throw new ApiError(400, '"limit" param must be a string');
			}

			if (search && typeof search !== "string") {
				throw new ApiError(400, '"search" param must be a string');
			}

			const parsedPage = parsePageString(page);
			const parsedLimit = parseLimitString(limit);
			const parsedSearch = parseSearchString(search);

			const offset = calcOffset(parsedPage, parsedLimit);

			const {roles, totalCount} = await RoleService.getAll({
				limit: parsedLimit,
				search: parsedSearch,
				offset
			});

			res.set({
				[Header.TOTAL_COUNT]: totalCount,
				[Header.PAGE]: parsedPage,
				[Header.PAGE_LIMIT]: parsedLimit,
				[Header.TOTAL_PAGES]: calcTotalPages(totalCount, parsedLimit)
			});
			res.json(roles);
		} catch (e) {
			next(e);
		}
	}
}

export default RolesController;
