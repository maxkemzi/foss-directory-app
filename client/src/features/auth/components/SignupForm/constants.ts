import {ValidationSchema} from "#src/shared/constants";
import {z} from "zod";

interface FormState {
	success: boolean;
	error: string | null;
	fieldErrors: {
		username?: string[];
		email?: string[];
		password?: string[];
		confirmPassword?: string[];
	};
}

const INITIAL_FORM_STATE: FormState = {
	success: false,
	error: null,
	fieldErrors: {}
};

const VALIDATION_SCHEMA = z
	.object({
		username: ValidationSchema.USERNAME,
		email: ValidationSchema.EMAIL,
		password: ValidationSchema.PASSWORD,
		confirmPassword: z.string().trim().min(1, "Confirm Password is required.")
	})
	.refine(({password, confirmPassword}) => password === confirmPassword, {
		message: "Passwords don't match.",
		path: ["confirmPassword"]
	});

export {INITIAL_FORM_STATE, VALIDATION_SCHEMA};
