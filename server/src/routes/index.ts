import {Router} from "express";
import authRouter from "./auth/authRouter";
import projectsRouter from "./projects/projectsRouter";
import githubRouter from "./github/githubRouter";
import accountRouter from "./account/accountRouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/projects", projectsRouter);
router.use("/github", githubRouter);
router.use("/account", accountRouter);

export default router;
