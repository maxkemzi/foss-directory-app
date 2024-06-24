import {TagDocument} from "#src/db/documents";
import {TagFromDb, TagDocument as TagDocumentType} from "#src/db/types";
import Model from "../Model";
import {createSearchCondition} from "../helpers";
import {CountOptions, FindOptions, TagModelImpl} from "./types";

class TagModel extends Model implements TagModelImpl {
	async findAll(opts: FindOptions = {}): Promise<TagDocument[]> {
		const {limit, offset, search} = opts;

		let query = "SELECT * FROM tag";

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

		const {rows} = await this.client.query<TagFromDb>(`${query};`);

		return rows.map(r => new TagDocument(r));
	}

	async countAll(opts: CountOptions = {}): Promise<number> {
		const {search} = opts;

		let query = "SELECT COUNT(*) FROM tag";

		if (search) {
			query += ` WHERE ${createSearchCondition(search, ["name"])}`;
		}

		const {
			rows: [{count}]
		} = await this.client.query<{count: string}>(`${query};`);

		return Number(count);
	}

	async findByName(name: TagDocumentType["name"]): Promise<TagDocument | null> {
		const {
			rows: [tag]
		} = await this.client.query<TagFromDb>(
			"SELECT * FROM tag WHERE name = $1;",
			[name]
		);

		return tag ? new TagDocument(tag) : null;
	}
}

export default TagModel;
