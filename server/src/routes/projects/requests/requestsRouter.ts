import {ProjectRequestsController} from "#src/controllers";
import {authChecker} from "#src/middlewares";
import {Router} from "express";

const requestsRouter = Router();

requestsRouter.post("/", authChecker, ProjectRequestsController.request);
requestsRouter.get("/", authChecker, ProjectRequestsController.getAll);
requestsRouter.post(
	"/:id/accept",
	authChecker,
	ProjectRequestsController.accept
);
requestsRouter.post(
	"/:id/reject",
	authChecker,
	ProjectRequestsController.reject
);

export default requestsRouter;
