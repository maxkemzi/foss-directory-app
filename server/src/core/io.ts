import {env} from "#src/config";
import {ExtendedUserDto, ProjectMessageService} from "#src/services";
import {JwtVerificator} from "#src/services/lib";
import {Server} from "socket.io";
import server from "./server";

const io = new Server(server, {
	cors: {
		origin: env.PUBLIC_CLIENT_URL
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

		const userPayload =
			JwtVerificator.verifyAccess<ExtendedUserDto>(accessToken);
		if (!userPayload) {
			throw new Error();
		}

		const room = `room${projectId}`;

		socket.join(room);

		socket.on("chat message", async message => {
			try {
				await ProjectMessageService.create(
					{
						projectId: message.projectId,
						userId: userPayload.id,
						text: message.text,
						type: message.type
					},
					userPayload.id
				);
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
