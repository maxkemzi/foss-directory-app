import {ValidationChain, param, query, body} from "express-validator";
import {Variant} from "./constants";

const createValidationChain: ValidationChain[] = [
	body("name")
		.isString()
		.trim()
		.notEmpty()
		.withMessage("'name' must be a string."),
	body("description")
		.isString()
		.trim()
		.notEmpty()
		.withMessage("'description' must be a string."),
	body("tags").custom(tags => {
		if (!Array.isArray(tags)) {
			throw new Error("'tags' must be an array.");
		}

		if (tags.length === 0) {
			throw new Error("'tags' must contain at least one element.");
		}

		if (!tags.every(t => typeof t === "string")) {
			throw new Error("Each element in 'tags' must be a string.");
		}

		return true;
	}),
	body("roles").custom(roles => {
		if (!Array.isArray(roles)) {
			throw new Error("'roles' must be an array.");
		}

		if (roles.length === 0) {
			throw new Error("'roles' must contain at least one element.");
		}

		if (
			!roles.every(
				t =>
					Array.isArray(t) &&
					t.length === 2 &&
					typeof t[0] === "string" &&
					typeof t[1] === "number"
			)
		) {
			throw new Error("'roles' must be an array of tuples [string, number].");
		}

		return true;
	}),
	body("repoUrl")
		.isString()
		.trim()
		.notEmpty()
		.withMessage("'repoUrl' must be a string."),
	body("role")
		.isString()
		.trim()
		.notEmpty()
		.withMessage("'role' must be a string.")
];

const getValidationChain: ValidationChain[] = [
	query("variant")
		.optional()
		.isIn(Object.values(Variant))
		.withMessage("Variant must be either 'all', 'owned' or 'member'."),
	query("page")
		.optional()
		.isInt({gt: 0})
		.withMessage("'page' must be an integer greater than 0."),
	query("limit")
		.optional()
		.isInt({gt: 0})
		.withMessage("'limit' must be an integer greater than 0."),
	query("search")
		.optional()
		.isString()
		.withMessage("'search' must be a string."),
	query("searchTags")
		.optional()
		.isString()
		.withMessage("'searchTags' must be a string.")
];

const idValidator = param("id")
	.isString()
	.trim()
	.notEmpty()
	.withMessage("'id' must be a non empty string.");

export {createValidationChain, getValidationChain, idValidator};
