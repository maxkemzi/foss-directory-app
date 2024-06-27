import {authChecker, validator} from "#src/middlewares";
import {Router} from "express";
import ProjectsController from "./ProjectsController";
import projectMessagesRouter from "./messages/projectMessagesRouter";
import projectRequestsRouter from "./requests/projectRequestsRouter";
import projectUsersRouter from "./users/projectUsersRouter";
import {CREATE_VALIDATION, GET_ALL_VALIDATION} from "./validations";
import {ID_VALIDATION} from "../validations";

const projectsRouter = Router();

projectsRouter.use("/requests", projectRequestsRouter);
projectsRouter.use("/:id/messages", projectMessagesRouter);
projectsRouter.use("/:id/users", projectUsersRouter);
projectsRouter.post(
	"/",
	authChecker,
	validator(CREATE_VALIDATION),
	ProjectsController.create
);
projectsRouter.get(
	"/",
	authChecker,
	validator(GET_ALL_VALIDATION),
	ProjectsController.getAll
);
projectsRouter.get(
	"/:id",
	authChecker,
	validator(ID_VALIDATION),
	ProjectsController.getById
);
projectsRouter.delete(
	"/:id",
	authChecker,
	validator(ID_VALIDATION),
	ProjectsController.deleteById
);
projectsRouter.delete(
	"/:id/leave",
	authChecker,
	validator(ID_VALIDATION),
	ProjectsController.leaveById
);

export default projectsRouter;
