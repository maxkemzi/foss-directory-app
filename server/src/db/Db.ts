import {env} from "#src/config";
import {Pool, PoolClient} from "pg";
import {NotificationChannel} from "./constants";
import {ProjectMessageDocument} from "./types";

class Db {
	private static POOL = new Pool({
		host: env.POSTGRES_HOST,
		user: env.POSTGRES_USER,
		password: env.POSTGRES_PASSWORD,
		database: env.POSTGRES_DATABASE,
		port: env.POSTGRES_PORT
	});

	static getClient() {
		return this.POOL.connect();
	}

	static async listenNotifications(
		client: PoolClient,
		callbacks: {
			onProjectMessageInsert?: (
				projectMessageId: ProjectMessageDocument["id"]
			) => void;
		}
	) {
		const {onProjectMessageInsert} = callbacks;

		client.on("notification", notification => {
			const {channel, payload} = notification;

			if (!payload) {
				return;
			}

			if (channel === NotificationChannel.PROJECT_MESSAGE_INSERT) {
				onProjectMessageInsert?.(payload);
			}
		});

		const channels = Object.values(NotificationChannel);
		return Promise.all(channels.map(c => client.query(`LISTEN ${c};`)));
	}
}

export default Db;
