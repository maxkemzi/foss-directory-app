import ApiError from "#src/lib/errors/ApiError";
import {isApiError, isValidationError} from "#src/lib/errors/helpers";
import ValidationError from "#src/lib/errors/ValidationError";

describe("isApiError", () => {
	it("should return true", () => {
		const apiError = new ApiError(400, "Some message", "some_message");

		expect(isApiError(apiError)).toBe(true);
	});

	it("should return false", () => {
		const genericError = new Error();

		expect(isApiError("error")).toBe(false);
		expect(isApiError(genericError)).toBe(false);
	});
});

describe("isValidationError", () => {
	it("should return true", () => {
		const validationError = new ValidationError({
			field: {
				location: "body",
				msg: "",
				path: "",
				type: "field",
				value: ""
			}
		});

		expect(isValidationError(validationError)).toBe(true);
	});

	it("should return false", () => {
		const genericError = new Error();

		expect(isValidationError("error")).toBe(false);
		expect(isValidationError(genericError)).toBe(false);
	});
});
