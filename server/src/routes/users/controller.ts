import {ApiError} from "#src/lib";
import {NextFunction, Request, Response} from "express";
import userService from "../../services/userService";

const deleteAuth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = res.locals.user?.id;
		if (!userId) {
			throw new ApiError(401, "Unauthorized");
		}

		await userService.deleteById(userId);

		res.json({success: true});
	} catch (e) {
		next(e);
	}
};

export default {deleteAuth};
