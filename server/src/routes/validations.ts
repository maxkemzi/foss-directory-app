import {query, param} from "express-validator";

const PAGINATION_VALIDATION = [
	query("page", "'page' must be a natural number.")
		.optional()
		.trim()
		.isInt({min: 1})
		.toInt(10),
	query("limit", "'limit' must be a number from 1 to 100.")
		.optional()
		.trim()
		.isInt({min: 1, max: 100})
		.toInt(10)
];

const SEARCH_VALIDATION = [
	query("search", "'search' must be a string.")
		.optional()
		.trim()
		.customSanitizer(value => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
];

const ID_VALIDATION = [
	param("id", "'id' must be a non empty string.").trim().notEmpty()
];

export {PAGINATION_VALIDATION, SEARCH_VALIDATION, ID_VALIDATION};
