import {ApiError} from "#src/lib";
import {githubService} from "#src/services";
import {NextFunction, Request, Response} from "express";

const githubConnectionChecker = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = res.locals.user?.id;
		if (!userId) {
			throw new ApiError(401, "Unauthorized");
		}

		const connection = await githubService.getConnectionByUserId(userId);

		res.locals.githubConnection = connection;
		next();
	} catch (e) {
		next(e);
	}
};

export default githubConnectionChecker;
