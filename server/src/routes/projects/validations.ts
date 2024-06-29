import {ValidationChain, body, query} from "express-validator";
import {PAGINATION_VALIDATION, SEARCH_VALIDATION} from "../validations";

const CREATE_VALIDATION: ValidationChain[] = [
	body(
		"name",
		"'name' must be a non-empty string between 5 and 50 characters long."
	)
		.isString()
		.withMessage("'name' must be a string.")
		.trim()
		.isLength({min: 5, max: 50})
		.withMessage("'name' must be between 5 and 50 characters long."),
	body("description", "'description' must be a non-empty string.")
		.isString()
		.withMessage("'description' must be a string.")
		.trim()
		.isLength({min: 15, max: 300})
		.withMessage("'description' must be between 15 and 300 characters long."),
	body("tags")
		.isArray()
		.withMessage("'tags' must be an array.")
		.isLength({min: 1})
		.withMessage("'tags' must contain at least one element."),
	body("tags.*", "'tags' elements must be non-empty strings.")
		.isString()
		.withMessage("'tags' elements must be strings.")
		.notEmpty()
		.withMessage("'tags' elements must not be empty."),
	body("roles")
		.isArray()
		.withMessage("'roles' must be an array.")
		.isLength({min: 1})
		.withMessage("'roles' must contain at least one element."),
	body("roles.*", "'roles' elements must be tuples [string, number].")
		.isArray()
		.withMessage("'roles' elements must be an array.")
		.custom(role => {
			if (
				role.length !== 2 ||
				typeof role[0] !== "string" ||
				typeof role[1] !== "number"
			) {
				throw new Error("'roles' elements must be a tuple [string, number].");
			}

			return true;
		}),
	body("repoUrl", "'repoUrl' must be a non-empty string.")
		.isString()
		.withMessage("'repoUrl' must be a string.")
		.trim()
		.notEmpty()
		.withMessage("'repoUrl' must not be empty."),
	body("role", "'role' must be a non-empty string.")
		.isString()
		.withMessage("'role' must be a string.")
		.trim()
		.notEmpty()
		.withMessage("'role' must not be empty.")
];

const GET_ALL_VALIDATION: ValidationChain[] = [
	...PAGINATION_VALIDATION,
	...SEARCH_VALIDATION,
	query("variant", "'variant' must be either 'all', 'owner' or 'member'.")
		.optional()
		.isString()
		.withMessage("'variant' must be a string.")
		.trim()
		.isIn(["all", "owner", "member"])
		.withMessage("'variant' must be either 'all', 'owner', or 'member'."),
	query("searchTags", "'searchTags' must be a comma-separated string.")
		.optional()
		.isString()
		.withMessage("'searchTags' must be a string.")
		.trim()
		.customSanitizer(value => value.split(","))
];

export {CREATE_VALIDATION, GET_ALL_VALIDATION};
