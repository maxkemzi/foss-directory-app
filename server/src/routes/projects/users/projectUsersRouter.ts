import {authChecker} from "#src/middlewares";
import {Router} from "express";
import ProjectUsersController from "./ProjectUsersController";

const projectUsersRouter = Router({mergeParams: true});

projectUsersRouter.get("/", authChecker, ProjectUsersController.getByProjectId);

export default projectUsersRouter;
