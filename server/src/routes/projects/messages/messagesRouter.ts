import {ProjectMessagesController} from "#src/controllers";
import {authChecker} from "#src/middlewares";
import {Router} from "express";

const messagesRouter = Router({mergeParams: true});

messagesRouter.get("/", authChecker, ProjectMessagesController.getByProjectId);

export default messagesRouter;
