import {authChecker} from "#src/middlewares";
import {Router} from "express";
import controller from "./controller";

const requestsRouter = Router();

requestsRouter.post("/", authChecker, controller.create);
requestsRouter.get("/received", authChecker, controller.getReceived);
requestsRouter.post("/:id/accept", authChecker, controller.acceptById);
requestsRouter.delete("/:id/reject", authChecker, controller.rejectById);

export default requestsRouter;
