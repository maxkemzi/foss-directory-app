import "dotenv/config";
import app from "#src/app";
import {Db} from "#src/db";

const PORT = process.env.PORT || 5000;

const start = async () => {
	await Db.init();
	app.listen(PORT, async () => {
		console.log(`Server is working on port ${PORT}.`);
	});
};

start();
