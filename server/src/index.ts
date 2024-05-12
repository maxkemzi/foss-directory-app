import "dotenv/config";
import {Db} from "#src/db";
import server from "./server";

const PORT = process.env.PORT || 5000;

const start = async () => {
	await Db.init();
	server.listen(PORT, async () => {
		console.log(`Server is working on port ${PORT}.`);
	});
};

start();
