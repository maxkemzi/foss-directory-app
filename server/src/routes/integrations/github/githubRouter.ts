import {authChecker, githubConnectionChecker} from "#src/middlewares";
import {Router} from "express";
import GithubController from "./GithubController";

const githubRouter = Router();

githubRouter.get("/", authChecker, GithubController.getAuthUrlAndCsrfToken);
githubRouter.get("/callback", GithubController.createConnection);
githubRouter.get(
	"/repos",
	authChecker,
	githubConnectionChecker,
	GithubController.getReposForUser
);

export default githubRouter;
