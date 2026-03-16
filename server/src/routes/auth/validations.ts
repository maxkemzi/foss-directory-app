import {body} from "express-validator";

const createUsernameValidation = () =>
	body("username", "'username' must be a string between 3 and 30 characters.")
		.isString()
		.withMessage("'username' must be a string.")
		.trim()
		.isLength({min: 3, max: 15})
		.withMessage("'username' must be between 3 and 30 characters long.");
const createEmailValidation = () =>
	body("email", "'email' must be a valid email address.")
		.isEmail()
		.withMessage("'email' must be a valid email address.")
		.normalizeEmail();

const createPasswordValidation = () =>
	body(
		"password",
		"'password' must be at least 8 characters long and contain at least one number, one lowercase letter, one uppercase letter, and one special character."
	)
		.isString()
		.withMessage("'password' must be a string.")
		.trim()
		.isLength({min: 8})
		.withMessage("'password' must be at least 8 characters long.")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#+])[A-Za-z\d@$!%*?&#+]/
		)
		.withMessage(
			"'password' must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
		);

const SIGNUP_VALIDATION = [
	createUsernameValidation(),
	createEmailValidation(),
	createPasswordValidation()
];

const LOGIN_VALIDATION = [createEmailValidation(), createPasswordValidation()];

export {SIGNUP_VALIDATION, LOGIN_VALIDATION};
