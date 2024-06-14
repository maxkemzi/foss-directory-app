import {ApiError} from "#src/lib";
import {tagService} from "#src/services";
import {
	Header,
	calcOffset,
	calcTotalPages,
	parseLimitString,
	parsePageString,
	parseSearchString
} from "#src/utils";
import {NextFunction, Request, Response} from "express";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
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

		const {tags, totalCount} = await tagService.getAll({
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
		res.json(tags);
	} catch (e) {
		next(e);
	}
};

export default {getAll};
