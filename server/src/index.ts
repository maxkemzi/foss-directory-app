import {env} from "./config";
import {io, server} from "./core";
import {Db, ProjectMessageModel, ProjectMessagePopulator} from "./db";
import {ProjectMessageDto} from "./services/dtos";

const start = async () => {
	try {
		const client = await Db.getClient();

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

		server.listen(env.PORT, async () => {
			console.log(`Server is working on port ${env.PORT}.`);
		});
	} catch (e) {
		console.log(e);
	}
};

start();
