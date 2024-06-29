import ApiError from "./ApiError";
import ValidationError from "./ValidationError";
import {ApiErrorInfo} from "./constants";
import {ApiErrorInfoType} from "./types";

class ErrorFactory {
	static getBadRequest(
		{message, code}: ApiErrorInfoType = ApiErrorInfo.BAD_REQUEST
	): ApiError {
		return new ApiError(400, message, code);
	}

	static getUnauthorized(
		{message, code}: ApiErrorInfoType = ApiErrorInfo.UNAUTHORIZED
	): ApiError {
		return new ApiError(401, message, code);
	}

	static getInternalServer(
		{message, code}: ApiErrorInfoType = ApiErrorInfo.INTERNAL_SERVER
	): ApiError {
		return new ApiError(500, message, code);
	}

	static getTooManyRequests(
		{message, code}: ApiErrorInfoType = ApiErrorInfo.TOO_MANY_REQUESTS
	): ApiError {
		return new ApiError(429, message, code);
	}

	static getForbidden(
		{message, code}: ApiErrorInfoType = ApiErrorInfo.FORBIDDEN
	): ApiError {
		return new ApiError(403, message, code);
	}

	static getValidation(errors: ValidationError["errors"]): ValidationError {
		return new ValidationError(errors);
	}
}

export default ErrorFactory;
