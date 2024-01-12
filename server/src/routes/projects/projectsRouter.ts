import {ProjectsController} from "#src/controllers";
import {authChecker} from "#src/middlewares";
import {Router} from "express";

const projectsRouter = Router();

projectsRouter.get("/", authChecker, ProjectsController.getAll);

export default projectsRouter;
