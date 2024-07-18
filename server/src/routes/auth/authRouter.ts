import {authChecker, rateLimitter, validator} from "#src/middlewares";
import {Router} from "express";
import AuthController from "./AuthController";
import {LOGIN_VALIDATION, SIGNUP_VALIDATION} from "./validations";

const authRouter = Router();

authRouter.get(
	"/verify-email/:token",
	rateLimitter,
	AuthController.verifyEmail
);
authRouter.post(
	"/signup",
	authChecker(true),
	rateLimitter,
	validator(SIGNUP_VALIDATION),
	AuthController.signUp
);
authRouter.post(
	"/login",
	authChecker(true),
	rateLimitter,
	validator(LOGIN_VALIDATION),
	AuthController.logIn
);
authRouter.post(
	"/refresh",
	authChecker(true),
	rateLimitter,
	AuthController.refresh
);
authRouter.post(
	"/logout",
	authChecker(true),
	rateLimitter,
	AuthController.logOut
);

export default authRouter;
