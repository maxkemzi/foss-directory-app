import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import {Client} from "pg";

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
		"Required database variables are not defined in .env file. Refer to the .env.example file for an example."
	);
}

const getDbClient = () => {
	return new Client({
		host: POSTGRES_HOST as string,
		user: POSTGRES_USER as string,
		password: POSTGRES_PASSWORD as string,
		database: POSTGRES_DATABASE as string,
		port: Number(POSTGRES_PORT as string)
	});
};

const readSqlFile = async (...paths: string[]): Promise<string> => {
	const filePath = path.join(...paths);

	const data = await fs.readFile(filePath, "utf-8");

	return data.toString();
};

export {getDbClient, readSqlFile};
