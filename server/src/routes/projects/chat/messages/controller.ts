import {ApiError} from "#src/lib";
import {projectChatMessageService} from "#src/services";
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

		const messages = await projectChatMessageService.getByProjectId(id, userId);

		res.json(messages);
	} catch (e) {
		next(e);
	}
};

export default {getByProjectId};
