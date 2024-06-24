import {authChecker, validator} from "#src/middlewares";
import {Router} from "express";
import ProjectsController from "./ProjectsController";
import projectMessagesRouter from "./messages/projectMessagesRouter";
import projectRequestsRouter from "./requests/projectRequestsRouter";
import projectUsersRouter from "./users/projectUsersRouter";
import {
	createValidationChain,
	getValidationChain,
	idValidator
} from "./validationChains";

const projectsRouter = Router();

projectsRouter.use("/requests", projectRequestsRouter);
projectsRouter.use("/:id/messages", projectMessagesRouter);
projectsRouter.use("/:id/users", projectUsersRouter);
projectsRouter.post(
	"/",
	authChecker,
	validator(createValidationChain),
	ProjectsController.create
);
projectsRouter.get(
	"/",
	authChecker,
	validator(getValidationChain),
	ProjectsController.getAll
);
projectsRouter.get(
	"/:id",
	authChecker,
	validator([idValidator]),
	ProjectsController.getById
);
projectsRouter.delete(
	"/:id",
	authChecker,
	validator([idValidator]),
	ProjectsController.deleteById
);
projectsRouter.delete(
	"/:id/leave",
	authChecker,
	validator([idValidator]),
	ProjectsController.leaveById
);

export default projectsRouter;
