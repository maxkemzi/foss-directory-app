/* eslint-disable no-await-in-loop */
import {PoolClient} from "pg";
import {ProjectPayload} from "../../types/payloads";
import {ProjectFromDb} from "../../types/rows";
import ProjectDocument from "./ProjectDocument";
import {FindOptions, CountOptions} from "./types";
import {createSearchCondition, createSearchTagsCondition} from "./helpers";

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

const deleteById = async (client: PoolClient, id: string): Promise<void> => {
	await client.query<ProjectFromDb>("DELETE FROM project WHERE id=$1;", [id]);
};

const findAll = async (
	client: PoolClient,
	opts: FindOptions = {}
): Promise<ProjectDocument[]> => {
	const {search, limit, offset, searchTags} = opts;

	let query = "SELECT DISTINCT p.* FROM project p";
	const conditions: string[] = [];

	if (searchTags) {
		query += `
			JOIN project_tags pt ON p.id = pt.project_id
			LEFT JOIN tag t ON pt.tag_id = t.id
		`;

		conditions.push(createSearchTagsCondition(searchTags));
	}

	if (search) {
		conditions.push(createSearchCondition(search, ["p.name", "p.description"]));
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
	const {rows} = await client.query<ProjectFromDb>(`${query};`, values);

	return rows.map(p => new ProjectDocument(p));
};

const countAll = async (
	client: PoolClient,
	opts: CountOptions = {}
): Promise<number> => {
	const {search, searchTags} = opts;

	let query = "SELECT COUNT(DISTINCT p.id) FROM project p";
	const conditions: string[] = [];

	if (searchTags) {
		query += `
			JOIN project_tags pt ON p.id = pt.project_id
			LEFT JOIN tag t ON pt.tag_id = t.id
		`;

		conditions.push(createSearchTagsCondition(searchTags));
	}

	if (search) {
		conditions.push(createSearchCondition(search, ["p.name", "p.description"]));
	}

	if (conditions.length > 0) {
		query += ` WHERE ${conditions.join(" AND ")}`;
	}

	const values = searchTags?.map(t => `%${t}%`) || [];
	const {
		rows: [{count}]
	} = await client.query<{count: string}>(`${query};`, values);

	return Number(count);
};

const findByOwnerUserId = async (
	client: PoolClient,
	id: string,
	opts: FindOptions = {}
): Promise<ProjectDocument[]> => {
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

	const {rows} = await client.query<ProjectFromDb>(`${query};`, [id]);

	return rows.map(r => new ProjectDocument(r));
};

const countByOwnerUserId = async (
	client: PoolClient,
	id: string,
	opts: CountOptions = {}
): Promise<number> => {
	const {search} = opts;

	let query = `SELECT COUNT(*) FROM project WHERE owner_user_account_id = $1`;

	if (search) {
		query += ` AND ${createSearchCondition(search, ["name", "description"])}`;
	}

	const {
		rows: [{count}]
	} = await client.query<{count: string}>(`${query};`, [id]);

	return Number(count);
};

const findByMemberUserId = async (
	client: PoolClient,
	id: string,
	opts: FindOptions = {}
): Promise<ProjectDocument[]> => {
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

	const {rows} = await client.query<ProjectFromDb>(`${query};`, [id]);

	return rows.map(r => new ProjectDocument(r));
};

const countByMemberUserId = async (
	client: PoolClient,
	id: string,
	opts: CountOptions = {}
): Promise<number> => {
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
	} = await client.query<{count: string}>(`${query};`, [id]);

	return Number(count);
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
	countAll,
	findById,
	findByMemberUserId,
	findByOwnerUserId,
	countByOwnerUserId,
	countByMemberUserId,
	insert
};
