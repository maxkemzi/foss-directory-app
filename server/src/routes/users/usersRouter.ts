import {authChecker} from "#src/middlewares";
import {Router} from "express";
import controller from "./controller";

const usersRouter = Router();

usersRouter.delete("/", authChecker, controller.deleteAuth);

export default usersRouter;
