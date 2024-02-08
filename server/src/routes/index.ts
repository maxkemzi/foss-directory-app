import {Router} from "express";
import authRouter from "./auth/authRouter";
import projectsRouter from "./projects/projectsRouter";
import integrationsRouter from "./integrations/integrationsRouter";
import usersRouter from "./users/usersRouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/projects", projectsRouter);
router.use("/integrations", integrationsRouter);
router.use("/users", usersRouter);

export default router;
