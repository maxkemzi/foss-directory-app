import {Router} from "express";
import AuthController from "./AuthController";

const authRouter = Router();

authRouter.post("/signup", AuthController.signUp);
authRouter.post("/login", AuthController.logIn);
authRouter.post("/refresh", AuthController.refresh);
authRouter.post("/logout", AuthController.logOut);

export default authRouter;
