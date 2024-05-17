import {ProjectMessageModel, UserModel} from "#src/db/models";
import {UserDto} from "#src/dtos";
import {JwtTokensService} from "#src/services";
import {Server} from "socket.io";
import server from "./server";

const io = new Server(server, {
	cors: {
		origin: process.env.CLIENT_URL
	}
});

io.on("connection", async socket => {
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

		const isContributor = await UserModel.isProjectContributor({
			projectId,
			userId: userPayload.id
		});
		if (!isContributor) {
			throw new Error();
		}

		const room = `room${projectId}`;

		socket.join(room);

		socket.on("chat message", async message => {
			try {
				await ProjectMessageModel.create({
					projectId: message.projectId,
					userId: userPayload.id,
					text: message.text,
					type: message.type
				});
			} catch (e) {
				console.log(e);
				socket.emit("sendingMessageFailed");
			}
		});

		socket.on("disconnect", () => {
			console.log("A user disconnected");
		});
	} catch (e) {
		socket.emit("authFailed");
		socket.disconnect();
	}
});

export default io;
