import {ProjectsController} from "#src/controllers";
import {Router} from "express";

const projectsRouter = Router();

projectsRouter.get("/", ProjectsController.getAll);

export default projectsRouter;
