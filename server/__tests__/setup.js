import {beforeEach} from "vitest";
import {Db} from "../src/db/index.ts";

beforeEach(async () => {
	await Db.cleanUp();
});
