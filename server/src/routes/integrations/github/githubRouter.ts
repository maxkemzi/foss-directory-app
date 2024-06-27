import {authChecker, validator} from "#src/middlewares";
import {
	PAGINATION_VALIDATION,
	SEARCH_VALIDATION
} from "#src/routes/validations";
import {Router} from "express";
import GithubController from "./GithubController";
import {CONNECT_VALIDATION} from "./validations";

const githubRouter = Router();

githubRouter.get("/", authChecker, GithubController.getAuthUrl);
githubRouter.get(
	"/connect",
	validator(CONNECT_VALIDATION),
	GithubController.connect
);
githubRouter.get(
	"/repos",
	authChecker,
	validator(PAGINATION_VALIDATION, SEARCH_VALIDATION),
	GithubController.getRepos
);

export default githubRouter;
