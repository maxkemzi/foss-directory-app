import {PoolClient} from "pg";
import {RefreshTokenPayload} from "../../types/payloads";
import {RefreshTokenFromDb} from "../../types/rows";
import RefreshTokenDocument from "./RefreshTokenDocument";

const upsert = async (
	client: PoolClient,
	payload: RefreshTokenPayload
): Promise<RefreshTokenDocument> => {
	const {userId, token} = payload;

	const {rows} = await client.query<RefreshTokenFromDb>(
		"INSERT INTO refresh_token(user_account_id, token) VALUES($1, $2) ON CONFLICT(user_account_id) DO UPDATE SET user_account_id=EXCLUDED.user_account_id, token=EXCLUDED.token RETURNING *;",
		[userId, token]
	);

	return new RefreshTokenDocument(rows[0]);
};

const findByUserId = async (
	client: PoolClient,
	id: RefreshTokenFromDb["id"]
): Promise<RefreshTokenDocument | null> => {
	const {
		rows: [token]
	} = await client.query<RefreshTokenFromDb>(
		"SELECT * FROM refresh_token WHERE user_account_id=$1;",
		[id]
	);

	return token ? new RefreshTokenDocument(token) : null;
};

const findByToken = async (
	client: PoolClient,
	token: RefreshTokenFromDb["token"]
): Promise<RefreshTokenDocument | null> => {
	const {
		rows: [refreshToken]
	} = await client.query<RefreshTokenFromDb>(
		"SELECT * FROM refresh_token WHERE token=$1;",
		[token]
	);

	return token ? new RefreshTokenDocument(refreshToken) : null;
};

const deleteByToken = async (
	client: PoolClient,
	token: RefreshTokenFromDb["token"]
) => {
	return client.query<RefreshTokenFromDb>(
		"DELETE FROM refresh_token WHERE token=$1;",
		[token]
	);
};

export default {deleteByToken, findByToken, findByUserId, upsert};
