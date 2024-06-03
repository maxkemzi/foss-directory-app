import {ValidationSchema} from "#src/shared/constants";
import {z} from "zod";

const LOGIN_VALIDATION_SCHEMA = z.object({
	email: ValidationSchema.EMAIL,
	password: z
		.string({invalid_type_error: "Password must be a string"})
		.trim()
		.min(1, "Password is required")
});

const SIGNUP_VALIDATION_SCHEMA = z
	.object({
		username: ValidationSchema.USERNAME,
		email: ValidationSchema.EMAIL,
		password: ValidationSchema.PASSWORD,
		confirmPassword: z.string().trim().min(1, "Confirm Password is required")
	})
	.refine(({password, confirmPassword}) => password === confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"]
	});

export {LOGIN_VALIDATION_SCHEMA, SIGNUP_VALIDATION_SCHEMA};
