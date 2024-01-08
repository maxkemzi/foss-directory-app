import "dotenv/config";
import {Db} from "../src/db/index.ts";

const setup = async () => {
	await Db.init();
};

export default setup;
