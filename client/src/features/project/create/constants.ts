import {z} from "zod";

const VALIDATION_SCHEMA = z.object({
	name: z
		.string({invalid_type_error: "Name must be a string"})
		.trim()
		.min(1, "Name is required")
		.min(5, "Name must be at least 5 characters long")
		.max(50, "Name must be at most 50 characters long"),
	description: z
		.string({invalid_type_error: "Description must be a string"})
		.trim()
		.min(1, "Description is required")
		.min(15, "Description must be at least 15 characters long")
		.max(300, "Description must be at most 300 characters long"),
	repoUrl: z
		.string({invalid_type_error: "Url must be a string"})
		.trim()
		.min(1, "Url is required"),
	role: z
		.string({invalid_type_error: "Role must be a string"})
		.trim()
		.min(1, "Role is required"),
	tags: z
		.string()
		.array()
		.refine(val => val.length > 0, {
			message: "Specify at least one tag"
		}),
	roles: z
		.tuple([z.string(), z.number()])
		.array()
		.refine(val => val.length > 0, {
			message: "Specify at least one role"
		})
});

const INITIAL_FIELD_VALUES = {
	name: "",
	description: "",
	repoUrl: "",
	role: "",
	tags: [],
	roles: []
};

export {VALIDATION_SCHEMA, INITIAL_FIELD_VALUES};
