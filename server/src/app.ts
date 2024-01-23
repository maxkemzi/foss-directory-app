import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import {errorHandler} from "#src/middlewares";
import router from "#src/routes";

const {
	POSTGRES_HOST,
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	POSTGRES_DATABASE,
	POSTGRES_TEST_DATABASE,
	POSTGRES_PORT,
	JWT_ACCESS_SECRET,
	JWT_REFRESH_SECRET,
	JWT_CSRF_SECRET,
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	CLIENT_URL
} = process.env;

const DATABASE =
	process.env.NODE_ENV === "test" ? POSTGRES_TEST_DATABASE : POSTGRES_DATABASE;

if (
	!POSTGRES_HOST ||
	!POSTGRES_USER ||
	!POSTGRES_PASSWORD ||
	!DATABASE ||
	!POSTGRES_PORT ||
	!JWT_ACCESS_SECRET ||
	!JWT_REFRESH_SECRET ||
	!JWT_CSRF_SECRET ||
	!GITHUB_CLIENT_ID ||
	!GITHUB_CLIENT_SECRET ||
	!CLIENT_URL
) {
	throw new Error(
		"Required variables are not defined in .env file. Refer to the .env.example file for an example."
	);
}

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL
	})
);

app.use("/api", router);
app.use(errorHandler);

export default app;
