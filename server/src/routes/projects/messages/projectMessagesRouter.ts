import {authChecker} from "#src/middlewares";
import {Router} from "express";
import ProjectMessagesController from "./ProjectMessagesController";

const projectMessagesRouter = Router({mergeParams: true});

projectMessagesRouter.get(
	"/",
	authChecker,
	ProjectMessagesController.getByProjectId
);

export default projectMessagesRouter;
