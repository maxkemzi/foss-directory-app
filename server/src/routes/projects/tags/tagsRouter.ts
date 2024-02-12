import {TagsController} from "#src/controllers";
import {Router} from "express";

const tagsRouter = Router();

tagsRouter.get("/", TagsController.getAll);

export default tagsRouter;
