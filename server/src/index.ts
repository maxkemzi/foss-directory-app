import "dotenv/config";
import {io, server} from "./core";
import {Db, ProjectMessageModel, ProjectMessagePopulator} from "./db";
import {ProjectMessageDto} from "./services/dtos";

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
		const client = await Db.getInstance().getClient();

		await Db.listenNotifications(client, {
			onProjectMessageInsert: async (id: string) => {
				const model = new ProjectMessageModel(client);

				try {
					const message = await model.findById(id);
					if (!message) {
						return;
					}

					const populator = new ProjectMessagePopulator(client);
					const populatedMessage = await populator.populate(message);

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
