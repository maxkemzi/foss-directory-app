import {AuthController} from "#src/controllers";
import {Router} from "express";

const authRouter = Router();

authRouter.post("/signup", AuthController.signup);
authRouter.post("/login", AuthController.login);
authRouter.post("/refresh", AuthController.refresh);
authRouter.post("/logout", AuthController.logout);

export default authRouter;
