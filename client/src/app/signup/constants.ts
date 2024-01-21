import {ValidationSchema} from "#src/constants";
import {z} from "zod";

interface FormState {
	status: string | null;
	errors: {
		username?: string[];
		email?: string[];
		password?: string[];
		confirmPassword?: string[];
	};
}

const INITIAL_FORM_STATE: FormState = {
	status: null,
	errors: {}
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
