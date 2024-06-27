import {validator} from "#src/middlewares";
import {Router} from "express";
import {PAGINATION_VALIDATION, SEARCH_VALIDATION} from "../validations";
import TagsController from "./TagsController";

const tagsRouter = Router();

tagsRouter.get(
	"/",
	validator(PAGINATION_VALIDATION, SEARCH_VALIDATION),
	TagsController.getAll
);

export default tagsRouter;
