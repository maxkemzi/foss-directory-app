import "dotenv/config";
import {projectMessageModel, db} from "#src/db";
import {io, server} from "./core";
import {ProjectMessageDto} from "./dtos";

const {
	POSTGRES_HOST,
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	POSTGRES_DATABASE,
	POSTGRES_PORT,
	JWT_ACCESS_SECRET,
	JWT_REFRESH_SECRET,
	JWT_CSRF_SECRET,
	ENCRYPTION_KEY,
	ENCRYPTION_IV,
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
	!ENCRYPTION_KEY ||
	!ENCRYPTION_IV ||
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
		const client = await db.getClient();

		await db.listenNotifications(client, {
			onProjectMessageInsert: async (id: string) => {
				try {
					const message = await projectMessageModel.findById(client, id);
					if (!message) {
						return;
					}

					const populatedMessage = await message.populate(client);

					io.to(`room${message.projectId}`).emit(
						"chat message",
						new ProjectMessageDto(populatedMessage)
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
