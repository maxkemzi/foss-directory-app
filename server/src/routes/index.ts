import {Router} from "express";
import authRouter from "./auth/authRouter";
import integrationsRouter from "./integrations/integrationsRouter";
import projectsRouter from "./projects/projectsRouter";
import rolesRouter from "./roles/rolesRouter";
import tagsRouter from "./tags/tagsRouter";
import usersRouter from "./users/usersRouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/projects", projectsRouter);
router.use("/integrations", integrationsRouter);
router.use("/users", usersRouter);
router.use("/roles", rolesRouter);
router.use("/tags", tagsRouter);

export default router;
