import {RoleDocument} from "#src/db/documents";
import {RoleFromDb, RoleDocument as RoleDocumentType} from "#src/db/types";
import Model from "../Model";
import {createSearchCondition} from "../helpers";
import {CountOptions, FindOptions, RoleModelImpl} from "./types";

class RoleModel extends Model implements RoleModelImpl {
	async findAll(opts: FindOptions = {}): Promise<RoleDocument[]> {
		const {limit, offset, search} = opts;

		let query = "SELECT * FROM role";

		if (search) {
			query += ` WHERE ${createSearchCondition(search, ["name"])}`;
		}

		query += ` ORDER BY created_at DESC, serial_id DESC`;

		if (limit) {
			query += ` LIMIT ${limit}`;
		}

		if (offset) {
			query += ` OFFSET ${offset}`;
		}

		const {rows} = await this.client.query<RoleFromDb>(`${query};`);

		return rows.map(r => new RoleDocument(r));
	}

	async countAll(opts: CountOptions = {}): Promise<number> {
		const {search} = opts;

		let query = "SELECT COUNT(*) FROM role";

		if (search) {
			query += ` WHERE ${createSearchCondition(search, ["name"])}`;
		}

		const {
			rows: [{count}]
		} = await this.client.query<{count: string}>(`${query};`);

		return Number(count);
	}

	async findByName(
		name: RoleDocumentType["name"]
	): Promise<RoleDocument | null> {
		const {
			rows: [role]
		} = await this.client.query<RoleFromDb>(
			"SELECT * FROM role WHERE name = $1;",
			[name]
		);

		return role ? new RoleDocument(role) : null;
	}
}

export default RoleModel;
