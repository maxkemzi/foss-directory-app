import {Router} from "express";
import authRouter from "./auth";
import integrationsRouter from "./integrations";
import projectsRouter from "./projects";
import rolesRouter from "./roles";
import tagsRouter from "./tags";
import usersRouter from "./users";

const router = Router();

router.use("/auth", authRouter);
router.use("/projects", projectsRouter);
router.use("/integrations", integrationsRouter);
router.use("/users", usersRouter);
router.use("/roles", rolesRouter);
router.use("/tags", tagsRouter);

export default router;
