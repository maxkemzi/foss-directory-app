import {query} from "express-validator";

const CONNECT_VALIDATION = [
	query("code", "'code' must be a non-empty string.")
		.isString()
		.withMessage("'code' must be a string.")
		.trim()
		.notEmpty()
		.withMessage("'code' must not be empty."),
	query("state", "'state' must be a non-empty string.")
		.isString()
		.withMessage("'state' must be a string.")
		.trim()
		.notEmpty()
		.withMessage("'state' must not be empty.")
];

export {CONNECT_VALIDATION};
