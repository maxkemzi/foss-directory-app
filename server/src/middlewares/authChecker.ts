import {UserDto} from "#src/dtos";
import {ApiError} from "#src/lib";
import {jwtService} from "#src/services";
import {NextFunction, Request, Response} from "express";

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

		const userPayload = jwtService.verifyAccessToken<UserDto>(accessToken);
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
