import {ValidationSchema} from "#src/shared/constants";
import {z} from "zod";

const VALIDATION_SCHEMA = z.object({
	email: ValidationSchema.EMAIL,
	password: z
		.string({invalid_type_error: "Password must be a string"})
		.trim()
		.min(1, "Password is required")
});

export {VALIDATION_SCHEMA};
