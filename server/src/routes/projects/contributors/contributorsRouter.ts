import {ProjectContributorsController} from "#src/controllers";
import {authChecker} from "#src/middlewares";
import {Router} from "express";

const contributorsRouter = Router({mergeParams: true});

contributorsRouter.delete(
	"/leave",
	authChecker,
	ProjectContributorsController.leave
);

export default contributorsRouter;
