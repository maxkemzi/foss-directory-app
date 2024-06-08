import {authChecker} from "#src/middlewares";
import {Router} from "express";
import chatRouter from "./chat/chatRouter";
import controller from "./controller";
import requestsRouter from "./requests/requestsRouter";
import usersRouter from "./users/usersRouter";

const projectsRouter = Router();

projectsRouter.use("/:id/chat", chatRouter);
projectsRouter.use("/requests", requestsRouter);
projectsRouter.use("/:id/users", usersRouter);
projectsRouter.post("/", authChecker, controller.create);
projectsRouter.get("/", authChecker, controller.getAll);
projectsRouter.get("/owned", authChecker, controller.getOwned);
projectsRouter.get("/chats", authChecker, controller.getChats);
projectsRouter.get("/:id", authChecker, controller.getById);
projectsRouter.delete("/:id", authChecker, controller.deleteById);
projectsRouter.delete("/:id/leave", authChecker, controller.leaveById);

export default projectsRouter;
