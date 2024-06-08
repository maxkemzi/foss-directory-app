/* eslint-disable no-await-in-loop */
import {PoolClient} from "pg";
import {PaginationArgs, ProjectPayload} from "../../types/payloads";
import {ProjectFromDb} from "../../types/rows";
import ProjectDocument from "./ProjectDocument";

const insert = async (
	client: PoolClient,
	payload: ProjectPayload
): Promise<ProjectDocument> => {
	const {name, description, ownerUserId, repoUrl} = payload;

	const {
		rows: [project]
	} = await client.query<ProjectFromDb>(
		"INSERT INTO project(owner_user_account_id, name, description, repo_url) VALUES($1, $2, $3, $4) RETURNING *;",
		[ownerUserId, name, description, repoUrl]
	);

	return new ProjectDocument(project);
};

const deleteById = async (client: PoolClient, id: string) => {
	return client.query<ProjectFromDb>("DELETE FROM project WHERE id=$1;", [id]);
};

const findAll = async (
	client: PoolClient,
	{search, limit, offset}: PaginationArgs
): Promise<{
	projects: ProjectDocument[];
	totalCount: number;
}> => {
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
		client.query<ProjectFromDb>(`${query};`),
		client.query<{count: string}>("SELECT COUNT(*) FROM project;")
	]);

	const projects = selectResult.rows.map(p => new ProjectDocument(p));
	const totalCount = Number(countResult.rows[0].count);

	return {projects, totalCount};
};

const findByOwnerUserId = async (
	client: PoolClient,
	id: string
): Promise<ProjectDocument[]> => {
	const {rows} = await client.query<ProjectFromDb>(
		"SELECT * FROM project WHERE owner_user_account_id=$1 ORDER BY created_at DESC;",
		[id]
	);

	return rows.map(r => new ProjectDocument(r));
};

const findByMemberUserId = async (
	client: PoolClient,
	id: string
): Promise<ProjectDocument[]> => {
	const {rows} = await client.query<ProjectFromDb>(
		`
		SELECT p.* FROM project p
		JOIN project_user_accounts pua ON p.id = pua.project_id
		WHERE pua.user_account_id = $1
		ORDER BY created_at DESC;
		`,
		[id]
	);

	return rows.map(r => new ProjectDocument(r));
};

const findById = async (
	client: PoolClient,
	id: string
): Promise<ProjectDocument | null> => {
	const {
		rows: [project]
	} = await client.query<ProjectFromDb>(
		"SELECT * FROM project WHERE id = $1;",
		[id]
	);

	return project ? new ProjectDocument(project) : null;
};

export default {
	deleteById,
	findAll,
	findById,
	findByMemberUserId,
	findByOwnerUserId,
	insert
};
