import {z} from "zod";

const VALIDATION_SCHEMA = z.object({
	projectId: z
		.string({invalid_type_error: "Project id must be a string"})
		.trim()
		.min(1, "Project id is required")
});

export {VALIDATION_SCHEMA};
