require("dotenv-safe").config();
const fs = require("node:fs/promises");
const path = require("node:path");
const {Client} = require("pg");

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
		host: POSTGRES_HOST,
		user: POSTGRES_USER,
		password: POSTGRES_PASSWORD,
		database: POSTGRES_DATABASE,
		port: Number(POSTGRES_PORT)
	});
};

const readSqlFile = async (...paths) => {
	const filePath = path.join(...paths);

	const data = await fs.readFile(filePath, "utf-8");

	return data.toString();
};

module.exports = {getDbClient, readSqlFile};
