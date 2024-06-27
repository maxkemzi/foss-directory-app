import {validator} from "#src/middlewares";
import {Router} from "express";
import {PAGINATION_VALIDATION, SEARCH_VALIDATION} from "../validations";
import RolesController from "./RolesController";

const rolesRouter = Router();

rolesRouter.get(
	"/",
	validator(PAGINATION_VALIDATION, SEARCH_VALIDATION),
	RolesController.getAll
);

export default rolesRouter;
