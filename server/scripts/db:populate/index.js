import {getDbClient, readSqlFile} from "../helpers";

const populateDb = async () => {
	const client = getDbClient();

	try {
		await client.connect();

		const sql = await readSqlFile(__dirname, "populate.sql");
		await client.query(sql);

		console.log("Database populated successfully");
	} catch (err) {
		console.error("Error populating database", err);
	} finally {
		await client.end();
	}
};

populateDb();
