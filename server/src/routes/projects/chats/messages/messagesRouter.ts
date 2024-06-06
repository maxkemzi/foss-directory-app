import {ProjectChatMessagesController} from "#src/controllers";
import {authChecker} from "#src/middlewares";
import {Router} from "express";

const messagesRouter = Router({mergeParams: true});

messagesRouter.get(
	"/",
	authChecker,
	ProjectChatMessagesController.getByProjectId
);

export default messagesRouter;
