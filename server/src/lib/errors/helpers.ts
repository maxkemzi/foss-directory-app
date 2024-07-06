import ApiError from "./ApiError";
import ValidationError from "./ValidationError";

const isApiError = (err: unknown): err is ApiError => err instanceof ApiError;

const isValidationError = (err: unknown): err is ValidationError =>
	err instanceof ValidationError;

export {isApiError, isValidationError};
