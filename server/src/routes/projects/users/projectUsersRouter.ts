import {authChecker, validator} from "#src/middlewares";
import {PAGINATION_VALIDATION} from "#src/routes/validations";
import {Router} from "express";
import ProjectUsersController from "./ProjectUsersController";

const projectUsersRouter = Router({mergeParams: true});

projectUsersRouter.get(
	"/",
	authChecker,
	validator(PAGINATION_VALIDATION),
	ProjectUsersController.getByProjectId
);

export default projectUsersRouter;
