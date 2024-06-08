import {Router} from "express";
import controller from "./controller";

const authRouter = Router();

authRouter.post("/signup", controller.signUp);
authRouter.post("/login", controller.logIn);
authRouter.post("/refresh", controller.refresh);
authRouter.post("/logout", controller.logOut);

export default authRouter;
