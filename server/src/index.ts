import "dotenv/config";
import {Db} from "#src/db";
import {io, server} from "./core";
import {ProjectMessageModel} from "./db/models";
import {PopulateUtils} from "./db/documents";
import {PopulatedProjectMessageDto} from "./dtos";

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

const PORT = process.env.PORT || 5000;

const start = async () => {
	await Db.init();

	const sendMessageToProjectRoom = async (id: string) => {
		try {
			const message = await ProjectMessageModel.getById(id);
			if (!message) {
				return;
			}

			const populatedMessage =
				await PopulateUtils.populateProjectMessage(message);
			io.to(`room${message.projectId}`).emit(
				"chat message",
				new PopulatedProjectMessageDto(populatedMessage)
			);
		} catch (e) {
			console.log(e);
		}
	};

	await Db.listenNotifications({
		onUserProjectJoin: sendMessageToProjectRoom,
		onUserProjectLeave: sendMessageToProjectRoom
	});

	server.listen(PORT, async () => {
		console.log(`Server is working on port ${PORT}.`);
	});
};

start();
