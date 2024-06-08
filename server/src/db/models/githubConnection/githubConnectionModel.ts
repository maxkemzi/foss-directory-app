import {PoolClient} from "pg";
import {GithubConnectionPayload} from "../../types/payloads";
import {GithubConnectionFromDb} from "../../types/rows";
import GithubConnectionDocument from "./GithubConnectionDocument";

const insert = async (
	client: PoolClient,
	payload: GithubConnectionPayload
): Promise<GithubConnectionDocument> => {
	const {userId, token} = payload;

	const {
		rows: [connection]
	} = await client.query<GithubConnectionFromDb>(
		"INSERT INTO github_connection(user_account_id, token) VALUES($1, $2) RETURNING *;",
		[userId, token]
	);

	return new GithubConnectionDocument(connection);
};

const findByUserId = async (
	client: PoolClient,
	userId: GithubConnectionPayload["userId"]
): Promise<GithubConnectionDocument | null> => {
	const {
		rows: [connection]
	} = await client.query<GithubConnectionFromDb>(
		"SELECT * FROM github_connection WHERE user_account_id = $1;",
		[userId]
	);

	return connection ? new GithubConnectionDocument(connection) : null;
};

export default {findByUserId, insert};
