import {NextFunction, Request, Response} from "express";
import {ApiError} from "#src/lib";

const errorHandler = (
	err: unknown,
	req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	next: NextFunction
) => {
	console.error(err);

	if (err instanceof ApiError) {
		res.status(err.status).json({error: err.message});
		return;
	}

	res.status(404).json({error: "Something went wrong."});
};

export default errorHandler;
