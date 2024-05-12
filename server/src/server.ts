import {errorHandler} from "#src/middlewares";
import router from "#src/routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import {createServer} from "node:http";
import {Server} from "socket.io";
import {UserDto} from "./dtos";
import {JwtTokensService, ProjectMessagesService} from "./services";

const {
	POSTGRES_HOST,
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	POSTGRES_DATABASE,
	POSTGRES_PORT,
	JWT_ACCESS_SECRET,
	JWT_REFRESH_SECRET,
	JWT_CSRF_SECRET,
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	CLIENT_URL,
	SERVER_URL
} = process.env;

if (
	!POSTGRES_HOST ||
	!POSTGRES_USER ||
	!POSTGRES_PASSWORD ||
	!POSTGRES_DATABASE ||
	!POSTGRES_PORT ||
	!JWT_ACCESS_SECRET ||
	!JWT_REFRESH_SECRET ||
	!JWT_CSRF_SECRET ||
	!GITHUB_CLIENT_ID ||
	!GITHUB_CLIENT_SECRET ||
	!CLIENT_URL ||
	!SERVER_URL
) {
	throw new Error(
		"Required variables are not defined in .env file. Refer to the .env.example file for an example."
	);
}

const app = express();
const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: process.env.CLIENT_URL
	}
});

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

io.on("connection", socket => {
	console.log("A user is connected");

	try {
		const projectId = socket.handshake.query?.projectId;
		if (!projectId || typeof projectId !== "string") {
			throw new Error();
		}

		const accessToken = socket.handshake.auth?.token;
		if (!accessToken) {
			throw new Error();
		}

		const userPayload = JwtTokensService.verifyAccess<UserDto>(accessToken);
		if (!userPayload) {
			throw new Error();
		}

		socket.join(`room${projectId}`);

		socket.on("chat message", async message => {
			const newMessage = await ProjectMessagesService.create({
				projectId,
				userId: userPayload.id,
				payload: {
					projectId: message.projectId,
					text: message.text,
					senderId: userPayload.id
				}
			});

			io.to(`room${message.projectId}`).emit("chat message", newMessage);
		});

		socket.on("disconnect", () => {
			console.log("A user disconnected");
		});
	} catch (e) {
		socket.emit("authFailed");
		socket.disconnect();
	}
});

export default server;
