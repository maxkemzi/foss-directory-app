import ApiError from "./ApiError";
import ValidationError from "./ValidationError";
import {ErrorData} from "./types";

class ErrorFactory {
	static getBadRequest(
		{message, code}: ErrorData = {
			message: "Bad request.",
			code: "bad_request"
		}
	): ApiError {
		return new ApiError(400, message, code);
	}

	static getUnauthorized(
		{message, code}: ErrorData = {
			message: "Unauthorized.",
			code: "unauthorized"
		}
	): ApiError {
		return new ApiError(401, message, code);
	}

	static getInternalServer(
		{message, code}: ErrorData = {
			message: "Internal server error.",
			code: "internal_server"
		}
	): ApiError {
		return new ApiError(500, message, code);
	}

	static getTooManyRequests(
		{message, code}: ErrorData = {
			message: "Too many requests.",
			code: "too_many_requests"
		}
	): ApiError {
		return new ApiError(429, message, code);
	}

	static getForbidden(
		{message, code}: ErrorData = {
			message: "Forbidden.",
			code: "forbidden"
		}
	): ApiError {
		return new ApiError(403, message, code);
	}

	static getValidation(errors: ValidationError["errors"]): ValidationError {
		return new ValidationError(errors);
	}
}

export default ErrorFactory;
