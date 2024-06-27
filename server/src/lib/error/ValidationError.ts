import {ValidationError as ValidatorValidationError} from "express-validator";
import ApiError from "./ApiError";

class ValidationError extends ApiError {
	errors: Record<string, ValidatorValidationError>;

	constructor(errors: Record<string, ValidatorValidationError>) {
		super(400, "Validation error.", "validation");
		this.errors = errors;

		Object.setPrototypeOf(this, ValidationError.prototype);
	}
}

export default ValidationError;
