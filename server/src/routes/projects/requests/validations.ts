import {ValidationChain, body} from "express-validator";

const CREATE_VALIDATION: ValidationChain[] = [
	body("projectId", "'projectId' must be a non-empty string.")
		.isString()
		.withMessage("'projectId' must be a string.")
		.trim()
		.notEmpty()
		.withMessage("'projectId' must not be empty."),
	body("projectRoleId", "'projectRoleId' must be a non-empty string.")
		.isString()
		.withMessage("'projectRoleId' must be a string.")
		.trim()
		.notEmpty()
		.withMessage("'projectRoleId' must not be empty.")
];

export {CREATE_VALIDATION};
