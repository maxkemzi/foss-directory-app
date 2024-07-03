import {Response} from "express";
import {ApiHeader} from "foss-directory-shared";

const calcOffset = (page: number, limit: number) => (page - 1) * limit;

const calcTotalPages = (totalCount: number, limit: number) =>
	Math.ceil(totalCount / limit);

const setPaginationHeaders = (
	res: Response,
	values: {page: number; totalCount: number; limit: number}
) => {
	const {page, limit, totalCount} = values;

	res.set({
		[ApiHeader.TOTAL_COUNT]: totalCount,
		[ApiHeader.PAGE]: page,
		[ApiHeader.PAGE_LIMIT]: limit,
		[ApiHeader.TOTAL_PAGES]: calcTotalPages(totalCount, limit)
	});
};

export {calcOffset, calcTotalPages, setPaginationHeaders};
