import {authChecker, githubConnectionChecker} from "#src/middlewares";
import {Router} from "express";
import controller from "./controller";

const githubRouter = Router();

githubRouter.get("/", authChecker, controller.getAuthUrlAndCsrfToken);
githubRouter.get("/callback", controller.createConnection);
githubRouter.get(
	"/repos",
	authChecker,
	githubConnectionChecker,
	controller.getReposForUser
);

export default githubRouter;
