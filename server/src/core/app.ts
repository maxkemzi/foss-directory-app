import {errorHandler} from "#src/middlewares";
import router from "#src/routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		credentials: true,
		origin: process.env.PUBLIC_CLIENT_URL
	})
);
app.use("/api", router);
app.use(errorHandler);

export default app;
