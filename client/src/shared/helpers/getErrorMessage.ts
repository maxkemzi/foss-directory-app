import {AppError} from "../error";

const getErrorMessage = (e: unknown) => {
	return e instanceof AppError ? e.message : "Something went wrong";
};

export default getErrorMessage;
