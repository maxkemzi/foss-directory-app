import ApiError from "#src/lib/errors/ApiError";
import ErrorFactory from "#src/lib/errors/ErrorFactory";
import ValidationError from "#src/lib/errors/ValidationError";
import {ValidationError as ValidatorValidationError} from "express-validator";

const info = {message: "Some error", code: "some_error"};

it("should create bad request error with message and code", () => {
	const result = ErrorFactory.getBadRequest(info);

	expect(result).toBeInstanceOf(ApiError);
	expect(result.status).toBe(400);
	expect(result.message).toBe(info.message);
	expect(result.code).toBe(info.code);
});

it("should create unauthorized error with message and code", () => {
	const result = ErrorFactory.getUnauthorized(info);

	expect(result).toBeInstanceOf(ApiError);
	expect(result.status).toBe(401);
	expect(result.message).toBe(info.message);
	expect(result.code).toBe(info.code);
});

it("should create internal server error with message and code", () => {
	const result = ErrorFactory.getInternalServer(info);

	expect(result).toBeInstanceOf(ApiError);
	expect(result.status).toBe(500);
	expect(result.message).toBe(info.message);
	expect(result.code).toBe(info.code);
});

it("should create too many requests error with message and code", () => {
	const result = ErrorFactory.getTooManyRequests(info);

	expect(result).toBeInstanceOf(ApiError);
	expect(result.status).toBe(429);
	expect(result.message).toBe(info.message);
	expect(result.code).toBe(info.code);
});

it("should create forbidden error with message and code", () => {
	const result = ErrorFactory.getForbidden(info);

	expect(result).toBeInstanceOf(ApiError);
	expect(result.status).toBe(403);
	expect(result.message).toBe(info.message);
	expect(result.code).toBe(info.code);
});

it("should create validation error with message and code", () => {
	const errors: Record<string, ValidatorValidationError> = {
		field: {
			location: "body",
			msg: "",
			path: "",
			type: "field",
			value: ""
		}
	};

	const result = ErrorFactory.getValidation(errors);

	expect(result).toBeInstanceOf(ValidationError);
	expect(result.errors).toEqual(errors);
});
