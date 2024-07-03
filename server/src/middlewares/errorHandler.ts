import {ApiError, ErrorFactory, ValidationError} from "#src/lib";
import {NextFunction, Request, Response} from "express";
import {ApiErrorInfo} from "foss-directory-shared";
import {DatabaseError} from "pg";

const errorHandler = (
	err: unknown,
	req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	next: NextFunction
) => {
	console.error(err);

	if (err instanceof DatabaseError) {
		if (err.code?.startsWith("22")) {
			res.status(400).json({error: "Wrong data type."});
			return;
		}
	}

	if (err instanceof ValidationError) {
		res.status(err.status).json({errors: err.errors, code: err.code});
		return;
	}

	if (err instanceof ApiError) {
		res.status(err.status).json({error: err.message, code: err.code});
		return;
	}

	const fallbackErr = ErrorFactory.getInternalServer(
		ApiErrorInfo.INTERNAL_SERVER
	);
	res
		.status(fallbackErr.status)
		.json({error: fallbackErr.message, code: fallbackErr.code});
};

export default errorHandler;
