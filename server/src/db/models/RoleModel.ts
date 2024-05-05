import {RoleFromDb} from "#src/types/db";
import Db from "../Db";
import {RoleDocument} from "../documents";

class RoleModel {
	static async getAll(): Promise<RoleDocument[]> {
		const {rows} = await Db.query<RoleFromDb>("SELECT * FROM roles;");
		return rows.map(t => new RoleDocument(t));
	}
}

export default RoleModel;
