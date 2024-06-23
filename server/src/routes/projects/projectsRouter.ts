import {authChecker, validator} from "#src/middlewares";
import {Router} from "express";
import controller from "./controller";
import messagesRouter from "./messages/messagesRouter";
import requestsRouter from "./requests/requestsRouter";
import usersRouter from "./users/usersRouter";
import {
	createValidationChain,
	getValidationChain,
	idValidator
} from "./validationChains";

const projectsRouter = Router();

projectsRouter.use("/requests", requestsRouter);
projectsRouter.use("/:id/messages", messagesRouter);
projectsRouter.use("/:id/users", usersRouter);
projectsRouter.post(
	"/",
	authChecker,
	validator(createValidationChain),
	controller.create
);
projectsRouter.get(
	"/",
	authChecker,
	validator(getValidationChain),
	controller.getAll
);
projectsRouter.get(
	"/:id",
	authChecker,
	validator([idValidator]),
	controller.getById
);
projectsRouter.delete(
	"/:id",
	authChecker,
	validator([idValidator]),
	controller.deleteById
);
projectsRouter.delete(
	"/:id/leave",
	authChecker,
	validator([idValidator]),
	controller.leaveById
);

export default projectsRouter;
