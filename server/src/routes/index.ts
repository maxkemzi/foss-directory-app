import {Router} from "express";
import authRouter from "./authRouter";
import projectsRouter from "./projects/projectsRouter";
import integrationsRouter from "./integrations/integrationsRouter";
import usersRouter from "./usersRouter";
import rolesRouter from "./rolesRouter";
import tagsRouter from "./tagsRouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/projects", projectsRouter);
router.use("/integrations", integrationsRouter);
router.use("/users", usersRouter);
router.use("/roles", rolesRouter);
router.use("/tags", tagsRouter);

export default router;
