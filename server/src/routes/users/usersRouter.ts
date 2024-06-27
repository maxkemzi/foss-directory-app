import {authChecker} from "#src/middlewares";
import {Router} from "express";
import UsersController from "./UsersController";

const usersRouter = Router();

usersRouter.delete("/", authChecker, UsersController.deleteAccount);

export default usersRouter;
