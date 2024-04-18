/* eslint-disable no-await-in-loop */
import Db from "../../Db";
import {ProjectDocument} from "../../documents";
import {ProjectFromDb, ProjectPayload, TagFromDb} from "../../types";

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

			const {rows: projects} = await client.query<ProjectFromDb>(
				"INSERT INTO projects(owner_id, name, description, repo_url) VALUES($1, $2, $3, $4) RETURNING *;",
				[ownerId, name, description, repoUrl]
			);
			const project = projects[0];

			// eslint-disable-next-line no-restricted-syntax
			for (const tag of tags) {
				const {rows} = await client.query<Pick<TagFromDb, "id">>(
					"SELECT id FROM tags WHERE name=$1;",
					[tag]
				);
				const tagRow = rows[0];

				if (!tagRow) {
					await client.query(
						"INSERT INTO projects_custom_tags(project_id, name) VALUES($1, $2);",
						[project.id, tag]
					);
				} else {
					await client.query(
						"INSERT INTO projects_tags(project_id, tag_id) VALUES($1, $2);",
						[project.id, tagRow.id]
					);
				}
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

	static async getAll(): Promise<ProjectDocument[]> {
		const {rows} = await Db.query<ProjectFromDb>("SELECT * FROM projects;");
		return rows.map(p => new ProjectDocument(p));
	}

	static async getAllByUserId(id: number): Promise<ProjectDocument[]> {
		const {rows} = await Db.query<ProjectFromDb>(
			"SELECT * FROM projects WHERE owner_id=$1;",
			[id]
		);
		return rows.map(p => new ProjectDocument(p));
	}

	static async getById(id: number): Promise<ProjectDocument | null> {
		const {rows} = await Db.query<ProjectFromDb>(
			"SELECT * FROM projects WHERE id=$1;",
			[id]
		);
		const project = rows[0];
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
