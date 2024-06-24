import {ProjectDocument} from "#src/db/documents";
import {
	ProjectDocument as ProjectDocumentType,
	ProjectFromDb,
	ProjectPayload,
	UserDocument
} from "#src/db/types";
import Model from "../Model";
import {createSearchCondition} from "../helpers";
import {CountOptions, FindOptions, ProjectModelImpl} from "./types";

class ProjectModel extends Model implements ProjectModelImpl {
	async insert(payload: ProjectPayload) {
		const {name, description, ownerUserId, repoUrl} = payload;

		const {
			rows: [project]
		} = await this.client.query<ProjectFromDb>(
			"INSERT INTO project(owner_user_account_id, name, description, repo_url) VALUES($1, $2, $3, $4) RETURNING *;",
			[ownerUserId, name, description, repoUrl]
		);

		return new ProjectDocument(project);
	}

	async findAll(opts: FindOptions = {}) {
		const {search, limit, offset, searchTags} = opts;

		let query = "SELECT DISTINCT p.* FROM project p";
		const conditions: string[] = [];

		if (searchTags) {
			query += `
			JOIN project_tags pt ON p.id = pt.project_id
			LEFT JOIN tag t ON pt.tag_id = t.id
		`;

			conditions.push(ProjectModel.createSearchTagsCondition(searchTags));
		}

		if (search) {
			conditions.push(
				createSearchCondition(search, ["p.name", "p.description"])
			);
		}

		if (conditions.length > 0) {
			query += ` WHERE ${conditions.join(" AND ")}`;
		}

		query += " ORDER BY created_at DESC, serial_id DESC";

		if (limit) {
			query += ` LIMIT ${limit}`;
		}

		if (offset) {
			query += ` OFFSET ${offset}`;
		}

		const values = searchTags?.map(t => `%${t}%`) || [];
		const {rows} = await this.client.query<ProjectFromDb>(`${query};`, values);

		return rows.map(p => new ProjectDocument(p));
	}

	async countAll(opts: CountOptions = {}) {
		const {search, searchTags} = opts;

		let query = "SELECT COUNT(DISTINCT p.id) FROM project p";
		const conditions: string[] = [];

		if (searchTags) {
			query += `
			JOIN project_tags pt ON p.id = pt.project_id
			LEFT JOIN tag t ON pt.tag_id = t.id
		`;

			conditions.push(ProjectModel.createSearchTagsCondition(searchTags));
		}

		if (search) {
			conditions.push(
				createSearchCondition(search, ["p.name", "p.description"])
			);
		}

		if (conditions.length > 0) {
			query += ` WHERE ${conditions.join(" AND ")}`;
		}

		const values = searchTags?.map(t => `%${t}%`) || [];
		const {
			rows: [{count}]
		} = await this.client.query<{count: string}>(`${query};`, values);

		return Number(count);
	}

	async findByOwnerUserId(id: UserDocument["id"], opts: FindOptions = {}) {
		const {search, limit, offset} = opts;

		let query = "SELECT * FROM project WHERE owner_user_account_id = $1";

		if (search) {
			query += ` AND ${createSearchCondition(search, ["name", "description"])}`;
		}

		query += ` ORDER BY created_at DESC, serial_id DESC`;

		if (limit) {
			query += ` LIMIT ${limit}`;
		}

		if (offset) {
			query += ` OFFSET ${offset}`;
		}

		const {rows} = await this.client.query<ProjectFromDb>(`${query};`, [id]);

		return rows.map(r => new ProjectDocument(r));
	}

	async countByOwnerUserId(id: UserDocument["id"], opts: CountOptions = {}) {
		const {search} = opts;

		let query = `SELECT COUNT(*) FROM project WHERE owner_user_account_id = $1`;

		if (search) {
			query += ` AND ${createSearchCondition(search, ["name", "description"])}`;
		}

		const {
			rows: [{count}]
		} = await this.client.query<{count: string}>(`${query};`, [id]);

		return Number(count);
	}

	async findByMemberUserId(id: UserDocument["id"], opts: FindOptions = {}) {
		const {search, limit, offset} = opts;

		let query = `
		SELECT p.* FROM project p
		JOIN project_user_accounts pua ON p.id = pua.project_id
		WHERE pua.user_account_id = $1
	`;

		if (search) {
			query += ` AND ${createSearchCondition(search, [
				"p.name",
				"p.description"
			])}`;
		}

		query += ` ORDER BY created_at DESC, serial_id DESC`;

		if (limit) {
			query += ` LIMIT ${limit}`;
		}

		if (offset) {
			query += ` OFFSET ${offset}`;
		}

		const {rows} = await this.client.query<ProjectFromDb>(`${query};`, [id]);

		return rows.map(r => new ProjectDocument(r));
	}

	async countByMemberUserId(id: UserDocument["id"], opts: CountOptions = {}) {
		const {search} = opts;

		let query = `
		SELECT COUNT(*) FROM project p
		JOIN project_user_accounts pua ON p.id = pua.project_id
		WHERE pua.user_account_id = $1
	`;

		if (search) {
			query += ` AND ${createSearchCondition(search, [
				"p.name",
				"p.description"
			])}`;
		}

		const {
			rows: [{count}]
		} = await this.client.query<{count: string}>(`${query};`, [id]);

		return Number(count);
	}

	private static createSearchTagsCondition(searchTags: string[]) {
		const conditions = searchTags.map(
			(_, i) => `(COALESCE(t.name, pt.name) ILIKE $${i + 1})`
		);
		return `(${conditions.join(" OR ")})`;
	}

	async findById(id: ProjectDocumentType["id"]) {
		const {
			rows: [project]
		} = await this.client.query<ProjectFromDb>(
			"SELECT * FROM project WHERE id = $1;",
			[id]
		);

		return project ? new ProjectDocument(project) : null;
	}

	async deleteById(id: ProjectDocumentType["id"]) {
		await this.client.query<ProjectFromDb>("DELETE FROM project WHERE id=$1;", [
			id
		]);
	}
}

export default ProjectModel;
