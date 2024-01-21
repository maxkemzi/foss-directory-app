import {ValidationSchema} from "#src/constants";
import {z} from "zod";

interface FormState {
	status: string | null;
	errors: {
		email?: string[];
		password?: string[];
	};
}

const INITIAL_FORM_STATE: FormState = {
	status: null,
	errors: {}
};

const VALIDATION_SCHEMA = z.object({
	email: ValidationSchema.EMAIL,
	password: z
		.string({invalid_type_error: "Password must be a string."})
		.trim()
		.min(1, "Password is required.")
});

export {INITIAL_FORM_STATE, VALIDATION_SCHEMA};
