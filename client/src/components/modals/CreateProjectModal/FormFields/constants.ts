import {z} from "zod";

interface FormState {
	success: boolean;
	error: string | null;
	fieldErrors: {
		name?: string[];
		description?: string[];
		repoUrl?: string[];
		role?: string[];
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
		.min(1, "Url is required."),
	role: z
		.string({invalid_type_error: "Role must be a string."})
		.trim()
		.min(1, "Role is required."),
	tags: z.string().array().nonempty({message: "Specify at least one tag."}),
	roles: z
		.record(z.string(), z.number())
		.refine(val => Object.keys(val).length > 0, {
			message: "Specify at least one role."
		})
});

const INITIAL_FIELD_VALUES = {
	name: "",
	description: "",
	repoUrl: "",
	role: "",
	tags: [],
	roles: {}
};

export {INITIAL_FORM_STATE, VALIDATION_SCHEMA, INITIAL_FIELD_VALUES};
export type {FormState};
