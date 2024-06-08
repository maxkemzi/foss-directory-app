import {getDbClient, readSqlFile} from "../helpers";

const initDb = async () => {
	const client = getDbClient();

	try {
		await client.connect();

		const sql = await readSqlFile(__dirname, "init.sql");
		await client.query(sql);

		console.log("Database intialized successfully");
	} catch (err) {
		console.error("Error intializing database", err);
	} finally {
		await client.end();
	}
};

initDb();
