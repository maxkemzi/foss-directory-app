import {z} from "zod";

interface FormState {
	success: boolean;
	error: string | null;
	fieldErrors: {
		name?: string[];
		description?: string[];
		repoUrl?: string[];
		tags?: string[];
		roles?: string[];
	};
}

const INITIAL_FORM_STATE: FormState = {
	success: false,
	error: null,
	fieldErrors: {}
};

const VALIDATION_SCHEMA = z.object({
	name: z
		.string({invalid_type_error: "Name must be a string."})
		.trim()
		.min(1, "Name is required."),
	description: z
		.string({invalid_type_error: "Description must be a string."})
		.trim()
		.min(1, "Description is required."),
	repoUrl: z
		.string({invalid_type_error: "Url must be a string."})
		.trim()
		.min(1, "Url is required.")
});

const INITIAL_FIELD_VALUES = {
	name: "",
	description: "",
	repoUrl: "",
	tags: [],
	roles: {}
};

export {INITIAL_FORM_STATE, VALIDATION_SCHEMA, INITIAL_FIELD_VALUES};
export type {FormState};
