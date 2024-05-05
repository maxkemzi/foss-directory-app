import {RolesController} from "#src/controllers";
import {Router} from "express";

const rolesRouter = Router();

rolesRouter.get("/", RolesController.getAll);

export default rolesRouter;
