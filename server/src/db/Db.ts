import {Pool, PoolClient} from "pg";
import {NotificationChannel} from "./constants";
import {ProjectMessageDocument} from "./types";

class Db {
	private static instance: Db;
	private pool: Pool;

	private constructor() {
		const {
			POSTGRES_HOST,
			POSTGRES_USER,
			POSTGRES_PASSWORD,
			POSTGRES_DATABASE,
			POSTGRES_PORT
		} = process.env;

		if (
			!POSTGRES_HOST ||
			!POSTGRES_USER ||
			!POSTGRES_PASSWORD ||
			!POSTGRES_DATABASE ||
			!POSTGRES_PORT
		) {
			throw new Error(
				"One or more required environment variables are missing."
			);
		}

		this.pool = new Pool({
			host: POSTGRES_HOST,
			user: POSTGRES_USER,
			password: POSTGRES_PASSWORD,
			database: POSTGRES_DATABASE,
			port: Number(POSTGRES_PORT)
		});
	}

	static getInstance(): Db {
		if (!Db.instance) {
			Db.instance = new Db();
		}
		return Db.instance;
	}

	getClient() {
		return this.pool.connect();
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
