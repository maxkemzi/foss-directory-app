import {authChecker} from "#src/middlewares";
import {Router} from "express";
import messagesRouter from "./messages/messagesRouter";
import controller from "./controller";

const chatRouter = Router({mergeParams: true});

chatRouter.use("/messages", messagesRouter);
chatRouter.get("/", authChecker, controller.getByProjectId);

export default chatRouter;
