import {Router} from "express";
import RolesController from "./RolesController";

const rolesRouter = Router();

rolesRouter.get("/", RolesController.getAll);

export default rolesRouter;
