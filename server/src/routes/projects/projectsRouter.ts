import {ProjectsController} from "#src/controllers";
import {authChecker} from "#src/middlewares";
import {Router} from "express";

const projectsRouter = Router();

projectsRouter.post("/", authChecker, ProjectsController.create);
projectsRouter.get("/", ProjectsController.getAll);
projectsRouter.delete("/:id", authChecker, ProjectsController.delete);

export default projectsRouter;
