import {authChecker, rateLimitter} from "#src/middlewares";
import {Router} from "express";
import UsersController from "./UsersController";

const usersRouter = Router();

usersRouter.use(authChecker, rateLimitter);
usersRouter.delete("/", UsersController.deleteAccount);

export default usersRouter;
