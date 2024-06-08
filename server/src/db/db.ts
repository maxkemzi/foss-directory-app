import {Pool, PoolClient} from "pg";
import {NotificationChannel} from "./constants";

const {
	POSTGRES_HOST,
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	POSTGRES_DATABASE,
	POSTGRES_PORT
} = process.env;

const pool = new Pool({
	host: POSTGRES_HOST as string,
	user: POSTGRES_USER as string,
	password: POSTGRES_PASSWORD as string,
	database: POSTGRES_DATABASE as string,
	port: Number(POSTGRES_PORT as string)
});

const getClient = () => {
	return pool.connect();
};

const query = <T extends object>(text: string, params?: any) => {
	return pool.query<T>(text, params);
};

const listenNotifications = (
	client: PoolClient,
	{
		onProjectMessageInsert
	}: {
		onProjectMessageInsert?: (projectMessageId: string) => void;
	}
) => {
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
};

export default {getClient, listenNotifications, query};
