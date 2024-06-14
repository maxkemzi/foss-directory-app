import {ApiError} from "#src/lib";
import {projectRequestService} from "#src/services";
import {
	parsePageString,
	parseLimitString,
	calcOffset,
	Header,
	calcTotalPages
} from "#src/utils";
import {NextFunction, Request, Response} from "express";

const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = res.locals.user?.id;
		if (!userId) {
			throw new ApiError(401, "Unauthorized");
		}

		const {projectId, projectRoleId} = req.body;

		await projectRequestService.create(
			{
				userId,
				projectId,
				projectRoleId
			},
			userId
		);

		res.json({success: true});
	} catch (e) {
		next(e);
	}
};

const getReceived = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = res.locals.user?.id;
		if (!userId) {
			throw new ApiError(401, "Unauthorized");
		}

		const {page, limit} = req.query;

		if (page && typeof page !== "string") {
			throw new ApiError(400, '"page" param must be a string');
		}

		if (limit && typeof limit !== "string") {
			throw new ApiError(400, '"limit" param must be a string');
		}

		const parsedPage = parsePageString(page);
		const parsedLimit = parseLimitString(limit);

		const offset = calcOffset(parsedPage, parsedLimit);

		const {requests, totalCount} =
			await projectRequestService.getByReceiverUserId(userId, {
				limit: parsedLimit,
				offset
			});

		res.set({
			[Header.TOTAL_COUNT]: totalCount,
			[Header.PAGE]: parsedPage,
			[Header.PAGE_LIMIT]: parsedLimit,
			[Header.TOTAL_PAGES]: calcTotalPages(totalCount, parsedLimit)
		});
		res.json(requests);
	} catch (e) {
		next(e);
	}
};

const acceptById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = res.locals.user?.id;
		if (!userId) {
			throw new ApiError(401, "Unauthorized");
		}

		const {id} = req.params;

		await projectRequestService.acceptById(id, userId);

		res.json({success: true});
	} catch (e) {
		next(e);
	}
};

const rejectById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = res.locals.user?.id;
		if (!userId) {
			throw new ApiError(401, "Unauthorized");
		}

		const {id} = req.params;

		await projectRequestService.rejectById(id, userId);

		res.json({success: true});
	} catch (e) {
		next(e);
	}
};

export default {
	create,
	getReceived,
	acceptById,
	rejectById
};
