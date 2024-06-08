import {ApiError} from "#src/lib";
import {projectRequestService} from "#src/services";
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

		const requests = await projectRequestService.getByReceiverUserId(userId);

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
