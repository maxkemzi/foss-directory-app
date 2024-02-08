import {IntegrationsController} from "#src/controllers";
import {authChecker} from "#src/middlewares";
import {Router} from "express";

const integrationsRouter = Router();

integrationsRouter.post(
	"/github",
	authChecker,
	IntegrationsController.githubAuth
);
integrationsRouter.get("/github", IntegrationsController.githubCallback);

export default integrationsRouter;
