import "dotenv/config";
import {Db} from "#src/db";
import {io, server} from "./core";
import {PopulateUtils} from "./db/documents";
import {ProjectMessageModel} from "./db/models";
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
	PUBLIC_CLIENT_URL,
	PUBLIC_SERVER_URL
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
	!PUBLIC_CLIENT_URL ||
	!PUBLIC_SERVER_URL
) {
	throw new Error(
		"Required variables are not defined in .env file. Refer to the .env.example file for an example."
	);
}

const PORT = process.env.PORT || 5000;

const start = async () => {
	try {
		await Db.init();

		await Db.listenNotifications({
			onProjectMessageInsert: async (id: string) => {
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
			}
		});

		server.listen(PORT, async () => {
			console.log(`Server is working on port ${PORT}.`);
		});
	} catch (e) {
		console.log(e);
	}
};

start();
