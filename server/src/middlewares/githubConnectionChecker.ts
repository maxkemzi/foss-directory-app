import {ApiError} from "#src/lib";
import {GithubService} from "#src/services";
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

		const connection = await GithubService.getConnectionByUserId(userId);

		res.locals.githubConnection = connection;
		next();
	} catch (e) {
		next(e);
	}
};

export default githubConnectionChecker;
