import {query} from "express-validator";

const CONNECT_VALIDATION = [
	query("code", "'code' must be a non-empty string.")
		.isString()
		.trim()
		.notEmpty(),
	query("state", "'state' must be a non-empty string.")
		.isString()
		.trim()
		.notEmpty()
];

export {CONNECT_VALIDATION};
