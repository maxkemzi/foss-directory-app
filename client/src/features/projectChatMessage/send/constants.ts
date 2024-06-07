import {z} from "zod";

const VALIDATION_SCHEMA = z
	.string({invalid_type_error: "Message must be a string"})
	.trim()
	.min(1, "Message is empty")
	.max(1000, "Message is too long");

export {VALIDATION_SCHEMA};
