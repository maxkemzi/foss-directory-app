import {GithubController} from "#src/controllers";
import {authChecker} from "#src/middlewares";
import {Router} from "express";

const githubRouter = Router();

githubRouter.get("/", authChecker, GithubController.authenticate);
githubRouter.get("/callback", GithubController.callback);
githubRouter.get("/repos", authChecker, GithubController.getRepos);

export default githubRouter;