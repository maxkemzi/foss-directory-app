import {authChecker} from "#src/middlewares";
import {Router} from "express";
import controller from "./controller";

const githubRouter = Router();

githubRouter.get("/", authChecker, controller.getAuthUrlAndCsrfToken);
githubRouter.get("/callback", controller.createConnection);
githubRouter.get("/repos", authChecker, controller.getReposForUser);

export default githubRouter;
