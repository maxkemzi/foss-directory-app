import {ValidationChain, body} from "express-validator";

const CREATE_VALIDATION: ValidationChain[] = [
	body("projectId", "'projectId' must be a non-empty string.")
		.isString()
		.trim()
		.notEmpty(),
	body("projectRoleId", "'repoUrl' must be a non-empty string.")
		.isString()
		.trim()
		.notEmpty()
];

export {CREATE_VALIDATION};
