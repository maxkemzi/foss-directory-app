import {z} from "zod";

const VALIDATION_SCHEMA = z.object({
	projectId: z
		.string({invalid_type_error: "Project id must be a string"})
		.trim()
		.min(1, "Project id is required"),
	projectRoleId: z
		.string({invalid_type_error: "Project role id must be a string"})
		.trim()
		.min(1, "Project role id is required")
});

export {VALIDATION_SCHEMA};
