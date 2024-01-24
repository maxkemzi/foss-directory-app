import {AccountController} from "#src/controllers";
import {authChecker} from "#src/middlewares";
import {Router} from "express";

const accountRouter = Router();

accountRouter.delete("/", authChecker, AccountController.delete);

export default accountRouter;
