import {Router} from "express";
import TagsController from "./TagsController";

const tagsRouter = Router();

tagsRouter.get("/", TagsController.getAll);

export default tagsRouter;
