import {authChecker} from "#src/middlewares";
import {Router} from "express";
import controller from "./controller";

const messagesRouter = Router({mergeParams: true});

messagesRouter.get("/", authChecker, controller.getByProjectId);

export default messagesRouter;
