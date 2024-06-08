import {Router} from "express";
import controller from "./controller";

const rolesRouter = Router();

rolesRouter.get("/", controller.getAll);

export default rolesRouter;
