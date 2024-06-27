import {ValidationChain, body, query} from "express-validator";
import {PAGINATION_VALIDATION, SEARCH_VALIDATION} from "../validations";

const CREATE_VALIDATION: ValidationChain[] = [
	body("name", "'name' must be a non-empty string.")
		.isString()
		.trim()
		.notEmpty(),
	body("description", "'description' must be a non-empty string.")
		.isString()
		.trim()
		.notEmpty(),
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
	body("repoUrl", "'repoUrl' must be a non-empty string.")
		.isString()
		.trim()
		.notEmpty(),
	body("role", "'role' must be a non-empty string.")
		.isString()
		.trim()
		.notEmpty()
];

const GET_ALL_VALIDATION: ValidationChain[] = [
	...PAGINATION_VALIDATION,
	...SEARCH_VALIDATION,
	query("variant", "'variant' must be either 'all', 'owner' or 'member'.")
		.optional()
		.isString()
		.trim()
		.isIn(["all", "owner", "member"]),
	query("searchTags", "'searchTags' must be a string.")
		.optional()
		.isString()
		.trim()
		.customSanitizer(value => value.split(","))
];

export {CREATE_VALIDATION, GET_ALL_VALIDATION};
