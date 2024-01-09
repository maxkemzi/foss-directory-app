import "dotenv/config";
import {Db} from "#src/db";

const setup = async () => {
	await Db.init();
};

export default setup;
