import {authChecker, rateLimitter, validator} from "#src/middlewares";
import {
	PAGINATION_VALIDATION,
	SEARCH_VALIDATION
} from "#src/routes/validations";
import {Router} from "express";
import GithubController from "./GithubController";
import {CONNECT_VALIDATION} from "./validations";

const githubRouter = Router();

githubRouter.get("/", authChecker(), rateLimitter, GithubController.getAuthUrl);
githubRouter.get(
	"/connect",
	rateLimitter,
	validator(CONNECT_VALIDATION),
	GithubController.connect
);
githubRouter.get(
	"/repos",
	authChecker(),
	rateLimitter,
	validator(PAGINATION_VALIDATION, SEARCH_VALIDATION),
	GithubController.getRepos
);

export default githubRouter;
