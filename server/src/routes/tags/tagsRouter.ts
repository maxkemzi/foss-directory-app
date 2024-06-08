import {Router} from "express";
import controller from "./controller";

const tagsRouter = Router();

tagsRouter.get("/", controller.getAll);

export default tagsRouter;
