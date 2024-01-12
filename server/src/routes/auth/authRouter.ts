import {Router} from "express";
import {AuthController} from "#src/controllers";
import {refreshTokenCookieChecker} from "#src/middlewares";

const authRouter = Router();

authRouter.post("/signup", AuthController.signup);
authRouter.post("/login", AuthController.login);
authRouter.post("/refresh", refreshTokenCookieChecker, AuthController.refresh);
authRouter.post("/check", AuthController.check);
authRouter.post("/logout", refreshTokenCookieChecker, AuthController.logout);

export default authRouter;
