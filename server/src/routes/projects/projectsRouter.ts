import {ProjectsController} from "#src/controllers";
import {authChecker} from "#src/middlewares";
import {Router} from "express";
import contributorsRouter from "./contributors/contributorsRouter";
import messagesRouter from "./messages/messagesRouter";
import requestsRouter from "./requests/requestsRouter";

const projectsRouter = Router();

projectsRouter.post("/", authChecker, ProjectsController.create);
projectsRouter.get("/", authChecker, ProjectsController.getAll);
projectsRouter.get("/auth", authChecker, ProjectsController.getAllAuth);
projectsRouter.get(
	"/contributed",
	authChecker,
	ProjectsController.getContributed
);
projectsRouter.delete("/:id", authChecker, ProjectsController.delete);

projectsRouter.use("/requests", requestsRouter);
projectsRouter.use("/:id/messages", messagesRouter);
projectsRouter.use("/:id/contributors", contributorsRouter);

export default projectsRouter;
