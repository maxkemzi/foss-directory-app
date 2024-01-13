import {GithubController} from "#src/controllers";
import {authChecker} from "#src/middlewares";
import {Router} from "express";

const githubRouter = Router();

githubRouter.post("/connect", authChecker, GithubController.connect);
githubRouter.get("/connected", authChecker, GithubController.connected);

export default githubRouter;
