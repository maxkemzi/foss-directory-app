import {Router} from "express";
import githubRouter from "./github/githubRouter";

const integrationsRouter = Router();

integrationsRouter.use("/github", githubRouter);

export default integrationsRouter;
