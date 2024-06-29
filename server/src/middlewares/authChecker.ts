import {ErrorFactory} from "#src/lib";
import {ExtendedUserDto} from "#src/services";
import {JwtVerificator} from "#src/services/lib";
import {NextFunction, Request, Response} from "express";
import {ApiErrorInfo} from "foss-directory-shared";

const authChecker = (req: Request, res: Response, next: NextFunction) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			throw ErrorFactory.getUnauthorized(ApiErrorInfo.AUTH_MISSING_HEADER);
		}

		const accessToken = authHeader.split(" ")[1];
		if (!accessToken) {
			throw ErrorFactory.getUnauthorized(ApiErrorInfo.AUTH_INVALID_HEADER);
		}

		const userPayload =
			JwtVerificator.verifyAccess<ExtendedUserDto>(accessToken);
		if (!userPayload) {
			throw ErrorFactory.getUnauthorized(ApiErrorInfo.AUTH_INVALID_TOKEN);
		}

		res.locals.user = userPayload;
		next();
	} catch (e) {
		next(e);
	}
};

export default authChecker;
