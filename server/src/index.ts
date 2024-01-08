import "dotenv/config";
import app from "./app";
import {Db} from "./db";

const PORT = process.env.PORT || 5000;

const start = async () => {
	await Db.init();
	app.listen(PORT, async () => {
		console.log(`Server is working on port ${PORT}.`);
	});
};

start();
