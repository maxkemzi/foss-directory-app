import {body} from "express-validator";

const SIGNUP_VALIDATION = [
	body("username", "'username' must be a string.").isString().trim().notEmpty(),
	body("email", "'email' must be a string.").isString().trim().notEmpty(),
	body("password", "'password' must be a string.").isString().trim().notEmpty()
];

const LOGIN_VALIDATION = [
	body("email", "'email' must be a string.").isString().trim().notEmpty(),
	body("password", "'password' must be a string.").isString().trim().notEmpty()
];

export {SIGNUP_VALIDATION, LOGIN_VALIDATION};
