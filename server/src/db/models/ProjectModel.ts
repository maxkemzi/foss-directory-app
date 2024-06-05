/* eslint-disable no-await-in-loop */
import {
	ProjectFromDb,
	ProjectRoleFromDb,
	ProjectTagFromDb,
	RoleFromDb,
	TagFromDb
} from "#src/types/db";
import {PaginationArgs, ProjectPayload} from "#src/types/db/models";
import {PoolClient} from "pg";
import Db from "../Db";
import {ProjectDocument} from "../documents";

class ProjectModel {
	static async create({
		name,
		description,
		ownerUserId,
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
				"INSERT INTO project(owner_user_account_id, name, description, repo_url) VALUES($1, $2, $3, $4) RETURNING *;",
				[ownerUserId, name, description, repoUrl]
			);

			const ownerProjectRole = await ProjectModel.#createProjectRole(client, {
				projectId: project.id,
				name: role
			});

			await client.query(
				"INSERT INTO project_user_accounts(user_account_id, project_id, project_role_id, is_owner) VALUES($1, $2, $3, $4);",
				[ownerUserId, project.id, ownerProjectRole.id, true]
			);

			// Tags
			// eslint-disable-next-line no-restricted-syntax
			for (const tagName of tags) {
				await ProjectModel.#createProjectTag(client, {
					projectId: project.id,
					name: tagName
				});
			}

			// Roles
			// eslint-disable-next-line no-restricted-syntax
			for (const [roleName, placesAvailable] of Object.entries(roles)) {
				await ProjectModel.#createProjectRole(client, {
					projectId: project.id,
					name: roleName,
					placesAvailable
				});
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

	static async #createProjectRole(
		client: PoolClient,
		{
			projectId,
			name,
			placesAvailable = 0
		}: {projectId: string; name: string; placesAvailable?: number}
	) {
		const {
			rows: [roleFromDb]
		} = await client.query<Pick<RoleFromDb, "id">>(
			"SELECT id FROM role WHERE name = $1;",
			[name]
		);

		const {
			rows: [role]
		} = await (roleFromDb
			? client.query<Pick<ProjectRoleFromDb, "id">>(
					"INSERT INTO project_roles(project_id, role_id, places_available, is_custom) VALUES($1, $2, $3, $4) RETURNING id;",
					[projectId, roleFromDb.id, placesAvailable, false]
				)
			: client.query<Pick<ProjectRoleFromDb, "id">>(
					"INSERT INTO project_roles(project_id, name, places_available, is_custom) VALUES($1, $2, $3, $4) RETURNING id;",
					[projectId, name, placesAvailable, true]
				));

		return role;
	}

	static async #createProjectTag(
		client: PoolClient,
		{projectId, name}: {projectId: string; name: string}
	) {
		const {
			rows: [tagFromDb]
		} = await client.query<Pick<TagFromDb, "id">>(
			"SELECT id FROM tag WHERE name=$1;",
			[name]
		);

		const {
			rows: [tag]
		} = await (tagFromDb
			? client.query<Pick<ProjectTagFromDb, "id">>(
					"INSERT INTO project_tags(project_id, tag_id, is_custom) VALUES($1, $2, $3);",
					[projectId, tagFromDb.id, false]
				)
			: client.query<Pick<ProjectTagFromDb, "id">>(
					"INSERT INTO project_tags(project_id, name, is_custom) VALUES($1, $2, $3);",
					[projectId, name, true]
				));

		return tag;
	}

	static async getAll({search, limit, offset}: PaginationArgs): Promise<{
		projects: ProjectDocument[];
		totalCount: number;
	}> {
		let query = `SELECT DISTINCT p.* FROM project p LEFT JOIN project_tags pt ON p.id = pt.project_id ORDER BY p.created_at DESC`;

		if (search) {
			const sanitizedSearch = search.replace(/'/g, "''");
			query += ` WHERE p.name ILIKE '%${sanitizedSearch}%' OR p.description ILIKE '%${sanitizedSearch}%' OR pt.tag_id IN (SELECT id FROM tag WHERE name ILIKE '%${sanitizedSearch}%')`;
		}

		if (offset) {
			query += ` OFFSET ${offset}`;
		}

		if (limit) {
			query += ` LIMIT ${limit}`;
		}

		const [selectResult, countResult] = await Promise.all([
			Db.query<ProjectFromDb>(`${query};`),
			Db.query<{count: number}>("SELECT COUNT(*) FROM project;")
		]);

		const projects = selectResult.rows.map(p => new ProjectDocument(p));
		const totalCount = countResult.rows[0].count;

		return {projects, totalCount};
	}

	static async getAllByUserId(id: string): Promise<ProjectDocument[]> {
		const {rows} = await Db.query<ProjectFromDb>(
			"SELECT * FROM project WHERE owner_user_account_id=$1 ORDER BY created_at DESC;",
			[id]
		);
		return rows.map(p => new ProjectDocument(p));
	}

	static async getContributed(userId: string): Promise<ProjectDocument[]> {
		const {rows} = await Db.query<ProjectFromDb>(
			`
			SELECT p.* FROM project p
			JOIN project_user_accounts pua ON p.id = pua.project_id
			WHERE pua.user_account_id = $1
			ORDER BY created_at DESC;
			`,
			[userId]
		);
		return rows.map(p => new ProjectDocument(p));
	}

	static async getById(id: string): Promise<ProjectDocument | null> {
		const {
			rows: [project]
		} = await Db.query<ProjectFromDb>("SELECT * FROM project WHERE id = $1;", [
			id
		]);

		if (!project) {
			return null;
		}

		return new ProjectDocument(project);
	}

	static async deleteById(id: string) {
		await Db.query<ProjectFromDb>("DELETE FROM project WHERE id=$1;", [id]);
	}
}

export default ProjectModel;
