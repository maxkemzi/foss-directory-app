import {ProjectUsersController} from "#src/controllers";
import {authChecker} from "#src/middlewares";
import {Router} from "express";

const usersRouter = Router({mergeParams: true});

usersRouter.get("/", authChecker, ProjectUsersController.getByProjectId);
usersRouter.delete("/leave", authChecker, ProjectUsersController.leave);

export default usersRouter;
