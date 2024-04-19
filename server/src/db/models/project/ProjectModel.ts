/* eslint-disable no-await-in-loop */
import Db from "../../Db";
import {ProjectDocument} from "../../documents";
import {
	GetAllQueryParams,
	ProjectFromDb,
	ProjectPayload,
	TagFromDb
} from "../../types";

class ProjectModel {
	static async create({
		name,
		description,
		ownerId,
		repoUrl,
		tags
	}: ProjectPayload): Promise<ProjectDocument> {
		const client = await Db.connect();

		try {
			await client.query("BEGIN");

			const {
				rows: [project]
			} = await client.query<ProjectFromDb>(
				"INSERT INTO projects(owner_id, name, description, repo_url) VALUES($1, $2, $3, $4) RETURNING *;",
				[ownerId, name, description, repoUrl]
			);

			// eslint-disable-next-line no-restricted-syntax
			for (const tag of tags) {
				const {
					rows: [tagFromDb]
				} = await client.query<Pick<TagFromDb, "id">>(
					"SELECT id FROM tags WHERE name=$1;",
					[tag]
				);
				let tagId = tagFromDb?.id;

				if (!tagId) {
					const {
						rows: [newTag]
					} = await client.query(
						"INSERT INTO tags(name) VALUES($1) RETURNING id;",
						[tag]
					);
					tagId = newTag.id;
				}

				await client.query(
					"INSERT INTO projects_tags(project_id, tag_id) VALUES($1, $2);",
					[project.id, tagId]
				);
			}

			await client.query("COMMIT");

			return new ProjectDocument(project);
		} catch (e) {
			await client.query("ROLLBACK");
			throw e;
		} finally {
			client.release();
		}
	}

	static async getAll({search, limit, offset}: GetAllQueryParams): Promise<{
		projects: ProjectDocument[];
		totalCount: number;
	}> {
		let query = `SELECT DISTINCT p.* FROM projects p LEFT JOIN projects_tags pt ON p.id = pt.project_id`;

		if (search) {
			const sanitizedSearch = search.replace(/'/g, "''");
			query += ` WHERE p.name ILIKE '%${sanitizedSearch}%' OR p.description ILIKE '%${sanitizedSearch}%' OR pt.tag_id IN (SELECT id FROM tags WHERE name ILIKE '%${sanitizedSearch}%')`;
		}

		if (offset) {
			query += ` OFFSET ${offset}`;
		}

		if (limit) {
			query += ` LIMIT ${limit}`;
		}

		const [selectResult, countResult] = await Promise.all([
			Db.query<ProjectFromDb>(`${query};`),
			Db.query<{count: number}>("SELECT COUNT(*) FROM projects;")
		]);

		const projects = selectResult.rows.map(p => new ProjectDocument(p));
		const totalCount = countResult.rows[0].count;

		return {projects, totalCount};
	}

	static async getAllByUserId(id: number): Promise<ProjectDocument[]> {
		const {rows} = await Db.query<ProjectFromDb>(
			"SELECT * FROM projects WHERE owner_id=$1;",
			[id]
		);
		return rows.map(p => new ProjectDocument(p));
	}

	static async getById(id: number): Promise<ProjectDocument | null> {
		const {
			rows: [project]
		} = await Db.query<ProjectFromDb>("SELECT * FROM projects WHERE id=$1;", [
			id
		]);

		if (!project) {
			return null;
		}

		return new ProjectDocument(project);
	}

	static async deleteById(id: number) {
		await Db.query<ProjectFromDb>("DELETE FROM projects WHERE id=$1;", [id]);
	}
}

export default ProjectModel;
