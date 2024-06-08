import {PoolClient} from "pg";
import {UserPayload} from "../../types/payloads";
import {UserFromDb} from "../../types/rows";
import UserDocument from "./UserDocument";

const insert = async (
	client: PoolClient,
	payload: UserPayload
): Promise<UserDocument> => {
	const {username, email, password, avatar} = payload;

	const {
		rows: [user]
	} = await client.query<UserFromDb>(
		"INSERT INTO user_account(username, email, password, avatar) VALUES($1, $2, $3, $4) RETURNING *;",
		[username, email, password, avatar]
	);

	return new UserDocument(user);
};

const findById = async (
	client: PoolClient,
	id: UserFromDb["id"]
): Promise<UserDocument | null> => {
	const {
		rows: [user]
	} = await client.query<UserFromDb>(
		"SELECT * FROM user_account WHERE id = $1;",
		[id]
	);

	return user ? new UserDocument(user) : null;
};

const findByUsername = async (
	client: PoolClient,
	username: UserFromDb["username"]
): Promise<UserDocument | null> => {
	const {
		rows: [user]
	} = await client.query<UserFromDb>(
		"SELECT * FROM user_account WHERE username = $1;",
		[username]
	);

	return user ? new UserDocument(user) : null;
};

const findByEmail = async (
	client: PoolClient,
	email: UserFromDb["email"]
): Promise<UserDocument | null> => {
	const {
		rows: [user]
	} = await client.query<UserFromDb>(
		"SELECT * FROM user_account WHERE email = $1;",
		[email]
	);

	return user ? new UserDocument(user) : null;
};

const deleteById = async (client: PoolClient, id: UserFromDb["id"]) => {
	return client.query<UserFromDb>("DELETE FROM user_account WHERE id = $1;", [
		id
	]);
};

const isProjectOwner = async (
	client: PoolClient,
	{
		projectId,
		userId
	}: {
		projectId: string;
		userId: string;
	}
): Promise<boolean> => {
	const {
		rows: [{count}]
	} = await client.query<{count: string}>(
		"SELECT COUNT(*) FROM project WHERE id = $1 AND owner_user_account_id = $2;",
		[projectId, userId]
	);

	return Number(count) > 0;
};

const isProjectMember = async (
	client: PoolClient,
	{
		projectId,
		userId
	}: {
		projectId: string;
		userId: string;
	}
): Promise<boolean> => {
	const {
		rows: [{count}]
	} = await client.query<{count: string}>(
		`
		SELECT COUNT(*) FROM project_user_accounts
		WHERE project_id = $1 AND user_account_id = $2;
		`,
		[projectId, userId]
	);

	return Number(count) > 0;
};

const isProjectRequestReceiver = async (
	client: PoolClient,
	{
		projectRequestId,
		userId
	}: {
		projectRequestId: string;
		userId: string;
	}
): Promise<boolean> => {
	const {
		rows: [{count}]
	} = await client.query<{count: string}>(
		`
		SELECT COUNT(*) FROM project_requests pr
		JOIN project p ON pr.project_id = p.id
		WHERE pr.id = $1 AND p.owner_user_account_id = $2;
		`,
		[projectRequestId, userId]
	);

	return Number(count) > 0;
};

export default {
	deleteById,
	findByEmail,
	findById,
	findByUsername,
	insert,
	isProjectMember,
	isProjectOwner,
	isProjectRequestReceiver
};
