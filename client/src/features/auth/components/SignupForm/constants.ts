import {ValidationSchema} from "#src/shared/constants";
import {z} from "zod";

const VALIDATION_SCHEMA = z
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

export {VALIDATION_SCHEMA};
