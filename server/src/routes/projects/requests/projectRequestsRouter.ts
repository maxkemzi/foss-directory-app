import {authChecker, validator} from "#src/middlewares";
import {ID_VALIDATION, PAGINATION_VALIDATION} from "#src/routes/validations";
import {Router} from "express";
import ProjectRequestsController from "./ProjectRequestsController";
import {CREATE_VALIDATION} from "./validations";

const projectRequestsRouter = Router();

projectRequestsRouter.post(
	"/",
	authChecker,
	validator(CREATE_VALIDATION),
	ProjectRequestsController.create
);
projectRequestsRouter.get(
	"/received",
	authChecker,
	validator(PAGINATION_VALIDATION),
	ProjectRequestsController.getReceived
);
projectRequestsRouter.post(
	"/:id/accept",
	authChecker,
	validator(ID_VALIDATION),
	ProjectRequestsController.acceptById
);
projectRequestsRouter.delete(
	"/:id/reject",
	authChecker,
	validator(ID_VALIDATION),
	ProjectRequestsController.rejectById
);

export default projectRequestsRouter;
