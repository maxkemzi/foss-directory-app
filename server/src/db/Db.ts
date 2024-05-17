import fs from "node:fs/promises";
import path from "node:path";
import {Pool} from "pg";
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

class Db {
	static async listenNotifications({
		onProjectMessageInsert
	}: {
		onProjectMessageInsert?: (projectMessageId: string) => void;
	}) {
		const client = await Db.connect();

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

	static connect() {
		return pool.connect();
	}

	static async init() {
		const sql = await Db.#readSqlFile("init.sql");
		return Db.query(sql);
	}

	static async populate() {
		const sql = await Db.#readSqlFile("populate.sql");
		return Db.query(sql);
	}

	static async cleanUp() {
		const sql = await Db.#readSqlFile("cleanup.sql");
		return Db.query(sql);
	}

	static async #readSqlFile(fileName: string): Promise<string> {
		const filePath = path.join(__dirname, "queries", fileName);
		return (await fs.readFile(filePath, "utf-8")).toString();
	}

	static query<T extends object>(text: string, params?: any) {
		return pool.query<T>(text, params);
	}
}

export default Db;
