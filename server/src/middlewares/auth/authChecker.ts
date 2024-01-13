import {NextFunction, Request, Response} from "express";
import {ApiError} from "#src/lib";
import {TokenService} from "#src/services";
import {UserDto} from "#src/dtos";

const authChecker = (req: Request, res: Response, next: NextFunction) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			throw new Error();
		}

		const accessToken = authHeader.split(" ")[1];
		if (!accessToken) {
			throw new Error();
		}

		const userPayload = TokenService.verifyAccess<UserDto>(accessToken);
		if (!userPayload) {
			throw new Error();
		}

		res.locals.user = userPayload;
		next();
	} catch (e) {
		next(new ApiError(401, "Unauthorized."));
	}
};

export default authChecker;
