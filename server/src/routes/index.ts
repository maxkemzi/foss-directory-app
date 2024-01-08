import {Router} from "express";
import authRouter from "./auth/authRouter";

const router = Router();

router.use("/auth", authRouter);

export default router;
