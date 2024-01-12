import {Router} from "express";
import authRouter from "./auth/authRouter";
import projectsRouter from "./projects/projectsRouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/projects", projectsRouter);

export default router;
