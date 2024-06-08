import {ApiError} from "#src/lib";
import {projectChatService} from "#src/services";
import {NextFunction, Request, Response} from "express";

const getByProjectId = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = res.locals.user?.id;
		if (!userId) {
			throw new ApiError(401, "Unauthorized");
		}

		const {id} = req.params;

		const chat = await projectChatService.getByProjectId(id, userId);

		res.json(chat);
	} catch (e) {
		next(e);
	}
};

export default {getByProjectId};
