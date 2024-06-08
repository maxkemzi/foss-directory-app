import {authChecker} from "#src/middlewares";
import {Router} from "express";
import controller from "./controller";

const usersRouter = Router({mergeParams: true});

usersRouter.get("/", authChecker, controller.getByProjectId);

export default usersRouter;
