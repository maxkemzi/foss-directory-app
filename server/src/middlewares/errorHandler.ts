import {ApiError} from "#src/lib";
import {NextFunction, Request, Response} from "express";
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

	if (err instanceof ApiError) {
		res.status(err.status).json({error: err.message});
		return;
	}

	res.status(404).json({error: "Something went wrong."});
};

export default errorHandler;
