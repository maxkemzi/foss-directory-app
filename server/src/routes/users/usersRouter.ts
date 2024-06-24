import {authChecker} from "#src/middlewares";
import {Router} from "express";
import UsersController from "./UsersController";

const usersRouter = Router();

usersRouter.delete("/", authChecker, UsersController.deleteAuth);

export default usersRouter;
