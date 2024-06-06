import {ProjectsController} from "#src/controllers";
import {authChecker} from "#src/middlewares";
import {Router} from "express";
import chatsRouter from "./chats/chatsRouter";
import requestsRouter from "./requests/requestsRouter";
import usersRouter from "./users/usersRouter";

const projectsRouter = Router();

projectsRouter.post("/", authChecker, ProjectsController.create);
projectsRouter.get("/", authChecker, ProjectsController.getAll);
projectsRouter.get("/auth", authChecker, ProjectsController.getAllAuth);
projectsRouter.use("/requests", requestsRouter);
projectsRouter.use("/chats", chatsRouter);
projectsRouter.get("/:id", authChecker, ProjectsController.getById);
projectsRouter.delete("/:id", authChecker, ProjectsController.delete);
projectsRouter.use("/:projectId/users", usersRouter);

export default projectsRouter;
