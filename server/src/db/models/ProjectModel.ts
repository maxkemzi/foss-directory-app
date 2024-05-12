/* eslint-disable no-await-in-loop */
import {
	ProjectFromDb,
	ProjectRoleFromDb,
	RoleFromDb,
	TagFromDb
} from "#src/types/db";
import {PaginationArgs, ProjectPayload} from "#src/types/db/models";
import Db from "../Db";
import {ProjectDocument} from "../documents";

class ProjectModel {
	static async create({
		name,
		description,
		ownerId,
		repoUrl,
		tags,
		roles,
		role
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

			// Owner
			const {
				rows: [ownerRoleFromDb]
			} = await client.query<Pick<TagFromDb, "id">>(
				"SELECT id FROM roles WHERE name=$1;",
				[role]
			);

			let ownerProjectRoleId;
			if (!ownerRoleFromDb) {
				const {rows} = await client.query<Pick<ProjectRoleFromDb, "id">>(
					"INSERT INTO projects_roles(project_id, name, is_custom) VALUES($1, $2, $3) RETURNING id;",
					[project.id, role, true]
				);
				ownerProjectRoleId = rows[0].id;
			} else {
				const {rows} = await client.query<Pick<ProjectRoleFromDb, "id">>(
					"INSERT INTO projects_roles(project_id, role_id, is_custom) VALUES($1, $2, $3) RETURNING id;",
					[project.id, ownerRoleFromDb.id, false]
				);
				ownerProjectRoleId = rows[0].id;
			}

			await client.query(
				"INSERT INTO projects_contributors(user_id, project_id, project_role_id, is_owner) VALUES($1, $2, $3, $4);",
				[ownerId, project.id, ownerProjectRoleId, true]
			);

			// Tags
			// eslint-disable-next-line no-restricted-syntax
			for (const tagName of tags) {
				const {
					rows: [tagFromDb]
				} = await client.query<Pick<TagFromDb, "id">>(
					"SELECT id FROM tags WHERE name=$1;",
					[tagName]
				);

				if (!tagFromDb) {
					await client.query(
						"INSERT INTO projects_tags(project_id, name, is_custom) VALUES($1, $2, $3);",
						[project.id, tagName, true]
					);
				} else {
					await client.query(
						"INSERT INTO projects_tags(project_id, tag_id, is_custom) VALUES($1, $2, $3);",
						[project.id, tagFromDb.id, false]
					);
				}
			}

			// Roles
			// eslint-disable-next-line no-restricted-syntax
			for (const [roleName, quantity] of Object.entries(roles)) {
				const {
					rows: [roleFromDb]
				} = await client.query<Pick<RoleFromDb, "id">>(
					"SELECT id FROM roles WHERE name=$1;",
					[roleName]
				);

				if (!roleFromDb) {
					await client.query(
						"INSERT INTO projects_roles(project_id, name, places_available, is_custom) VALUES($1, $2, $3, $4);",
						[project.id, roleName, quantity, true]
					);
				} else {
					await client.query(
						"INSERT INTO projects_roles(project_id, role_id, places_available, is_custom) VALUES($1, $2, $3, $4);",
						[project.id, roleFromDb.id, quantity, false]
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

	static async getAll({search, limit, offset}: PaginationArgs): Promise<{
		projects: ProjectDocument[];
		totalCount: number;
	}> {
		let query = `SELECT DISTINCT p.* FROM projects p LEFT JOIN projects_tags pt ON p.id = pt.project_id ORDER BY p.created_at DESC`;

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

	static async getAllByUserId(id: string): Promise<ProjectDocument[]> {
		const {rows} = await Db.query<ProjectFromDb>(
			"SELECT * FROM projects WHERE owner_id=$1 ORDER BY created_at DESC;",
			[id]
		);
		return rows.map(p => new ProjectDocument(p));
	}

	static async getContributed(userId: string): Promise<ProjectDocument[]> {
		const {rows} = await Db.query<ProjectFromDb>(
			`
			SELECT p.* FROM projects p
			JOIN projects_contributors pc ON p.id = pc.project_id
			WHERE pc.user_id = $1
			ORDER BY created_at DESC;
			`,
			[userId]
		);
		return rows.map(p => new ProjectDocument(p));
	}

	static async getById(id: string): Promise<ProjectDocument | null> {
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

	static async deleteById(id: string) {
		await Db.query<ProjectFromDb>("DELETE FROM projects WHERE id=$1;", [id]);
	}
}

export default ProjectModel;
