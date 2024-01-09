import {Db} from "#src/db";

beforeEach(async () => {
	await Db.cleanUp();
});
