import {z} from "zod";

const ValidationSchema = {
	USERNAME: z
		.string({invalid_type_error: "Username must be a string"})
		.trim()
		.min(1, "Username is required")
		.min(5, "Username must be at least 5 characters long")
		.max(15, "Username must contain not more than 15 characters"),
	EMAIL: z
		.string({invalid_type_error: "Email must be a string"})
		.trim()
		.min(1, "Email is required")
		.email("Email is invalid"),
	PASSWORD: z
		.string({invalid_type_error: "Password must be a string"})
		.trim()
		.min(1, "Password is required")
		.min(8, "Password must be at least 8 characters long")
		.refine(
			value =>
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#+])[A-Za-z\d@$!%*?&#+]/.test(
					value
				),
			{
				message:
					"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
			}
		)
};

export default ValidationSchema;
