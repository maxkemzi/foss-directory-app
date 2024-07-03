import {validator} from "#src/middlewares";
import {Router} from "express";
import {PAGINATION_VALIDATION} from "../../validations";
import ProjectMessagesController from "./ProjectMessagesController";

const projectMessagesRouter = Router({mergeParams: true});

projectMessagesRouter.get(
	"/",
	validator(PAGINATION_VALIDATION),
	ProjectMessagesController.getByProjectId
);

export default projectMessagesRouter;
