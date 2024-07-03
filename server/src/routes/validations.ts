import {query, param} from "express-validator";

const createPageValidation = () =>
	query("page", "'page' must be a positive integer.")
		.default(1)
		.isInt({gt: 0})
		.withMessage("'page' must be a positive integer.")
		.toInt(10);

const createLimitValidation = () =>
	query("limit", "'limit' must be an integer from 1 to 100.")
		.default(10)
		.isInt({gt: 0, lt: 101})
		.withMessage("'limit' must be an integer from 1 to 100.")
		.toInt(10);

const createSearchValidation = () =>
	query("search", "'search' must be a string.")
		.optional()
		.isString()
		.withMessage("'search' must be a string.")
		.trim()
		.customSanitizer(value => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

const createIdValidation = () =>
	param("id", "'id' must be a non empty string.")
		.isString()
		.withMessage("'id' must be a string.")
		.trim()
		.notEmpty()
		.withMessage("'id' must not be empty.");

const PAGINATION_VALIDATION = [createPageValidation(), createLimitValidation()];
const SEARCH_VALIDATION = [createSearchValidation()];
const ID_VALIDATION = [createIdValidation()];

export {
	createPageValidation,
	createLimitValidation,
	createSearchValidation,
	createIdValidation,
	PAGINATION_VALIDATION,
	SEARCH_VALIDATION,
	ID_VALIDATION
};
