import {authChecker} from "#src/middlewares";
import {Router} from "express";
import ProjectRequestsController from "./ProjectRequestsController";

const projectRequestsRouter = Router();

projectRequestsRouter.post("/", authChecker, ProjectRequestsController.create);
projectRequestsRouter.get(
	"/received",
	authChecker,
	ProjectRequestsController.getReceived
);
projectRequestsRouter.post(
	"/:id/accept",
	authChecker,
	ProjectRequestsController.acceptById
);
projectRequestsRouter.delete(
	"/:id/reject",
	authChecker,
	ProjectRequestsController.rejectById
);

export default projectRequestsRouter;
