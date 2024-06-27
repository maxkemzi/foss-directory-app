import {validator} from "#src/middlewares";
import {Router} from "express";
import AuthController from "./AuthController";
import {LOGIN_VALIDATION, SIGNUP_VALIDATION} from "./validations";

const authRouter = Router();

authRouter.post("/signup", validator(SIGNUP_VALIDATION), AuthController.signUp);
authRouter.post("/login", validator(LOGIN_VALIDATION), AuthController.logIn);
authRouter.post("/refresh", AuthController.refresh);
authRouter.post("/logout", AuthController.logOut);

export default authRouter;
