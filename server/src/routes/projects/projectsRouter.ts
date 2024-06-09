import {authChecker} from "#src/middlewares";
import {Router} from "express";
import controller from "./controller";
import requestsRouter from "./requests/requestsRouter";
import usersRouter from "./users/usersRouter";
import messagesRouter from "./messages/messagesRouter";

const projectsRouter = Router();

projectsRouter.use("/requests", requestsRouter);
projectsRouter.use("/:id/messages", messagesRouter);
projectsRouter.use("/:id/users", usersRouter);
projectsRouter.post("/", authChecker, controller.create);
projectsRouter.get("/", authChecker, controller.getAll);
projectsRouter.get("/owned", authChecker, controller.getOwned);
projectsRouter.get("/membership", authChecker, controller.getByMembership);
projectsRouter.get("/:id", authChecker, controller.getById);
projectsRouter.delete("/:id", authChecker, controller.deleteById);
projectsRouter.delete("/:id/leave", authChecker, controller.leaveById);

export default projectsRouter;
