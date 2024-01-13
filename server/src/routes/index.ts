import {Router} from "express";
import authRouter from "./auth/authRouter";
import projectsRouter from "./projects/projectsRouter";
import githubRouter from "./github/githubRouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/projects", projectsRouter);
router.use("/github", githubRouter);

export default router;
