import {NextFunction, Request, Response} from "express";
import {ApiError} from "../../lib";

const refreshTokenCookieChecker = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const {refreshToken} = req.cookies;

	if (!refreshToken) {
		next(new ApiError(401, "Unauthorized."));
		return;
	}

	next();
};

export default refreshTokenCookieChecker;
