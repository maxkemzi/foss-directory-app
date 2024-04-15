import {ProjectsController} from "#src/controllers";
import {authChecker} from "#src/middlewares";
import {Router} from "express";
import tagsRouter from "./tags/tagsRouter";

const projectsRouter = Router();

projectsRouter.post("/", authChecker, ProjectsController.create);
projectsRouter.get("/", ProjectsController.getAll);
projectsRouter.get("/auth", authChecker, ProjectsController.getAllAuth);
projectsRouter.delete("/:id", authChecker, ProjectsController.delete);

projectsRouter.use("/tags", tagsRouter);

export default projectsRouter;
