import {ProjectChatsController} from "#src/controllers";
import {authChecker} from "#src/middlewares";
import {Router} from "express";
import messagesRouter from "./messages/messagesRouter";

const chatsRouter = Router();

chatsRouter.get("/", authChecker, ProjectChatsController.getByAuth);
chatsRouter.get(
	"/:projectId",
	authChecker,
	ProjectChatsController.getByProjectId
);
chatsRouter.use("/:projectId/messages", messagesRouter);

export default chatsRouter;
