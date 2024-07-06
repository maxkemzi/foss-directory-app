import ValidationError from "#src/lib/errors/ValidationError";
import {ValidationError as ValidatorValidationError} from "express-validator";

const errors: Record<string, ValidatorValidationError> = {
	field: {
		location: "body",
		msg: "",
		path: "",
		type: "field",
		value: ""
	}
};

let result: ValidationError;

beforeEach(() => {
	result = new ValidationError(errors);
});

it("should create an instance of ApiError", () => {
	expect(result).toBeInstanceOf(ValidationError);
});

it("should set properties", () => {
	expect(result.status).toBe(400);
	expect(result.message).toBe("Validation error.");
	expect(result.code).toBe("validation");
});

it("should have the correct prototype", () => {
	expect(Object.getPrototypeOf(result)).toBe(ValidationError.prototype);
});
