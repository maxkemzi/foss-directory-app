import {AuthError, ErrorFactory} from "#src/lib";
import {ExtendedUserDto} from "#src/services";
import {JwtVerificator} from "#src/services/lib";
import {NextFunction, Request, Response} from "express";

const authChecker = (req: Request, res: Response, next: NextFunction) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			throw ErrorFactory.getUnauthorized(AuthError.AUTH_HEADER_MISSING);
		}

		const accessToken = authHeader.split(" ")[1];
		if (!accessToken) {
			throw ErrorFactory.getUnauthorized(AuthError.INVALID_AUTH_HEADER);
		}

		const userPayload =
			JwtVerificator.verifyAccess<ExtendedUserDto>(accessToken);
		if (!userPayload) {
			throw ErrorFactory.getUnauthorized(AuthError.INVALID_TOKEN);
		}

		res.locals.user = userPayload;
		next();
	} catch (e) {
		next(e);
	}
};

export default authChecker;
