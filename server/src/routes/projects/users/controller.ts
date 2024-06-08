import {ApiError} from "#src/lib";
import {projectUserService} from "#src/services";
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

		const users = await projectUserService.getByProjectId(id, userId);

		res.json(users);
	} catch (e) {
		next(e);
	}
};

export default {getByProjectId};
