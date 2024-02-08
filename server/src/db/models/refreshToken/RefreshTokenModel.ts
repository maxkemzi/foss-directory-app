import Db from "../../Db";
import RefreshTokenDocument from "./RefreshTokenDocument";
import {RefreshTokenFromDb, RefreshTokenPayload} from "./types";

class RefreshTokenModel {
	static async upsert({
		userId,
		token
	}: RefreshTokenPayload): Promise<RefreshTokenDocument> {
		const {rows} = await Db.query<RefreshTokenFromDb>(
			"INSERT INTO refresh_tokens(user_id, token) VALUES($1, $2) ON CONFLICT(user_id) DO UPDATE SET user_id=EXCLUDED.user_id, token=EXCLUDED.token RETURNING *;",
			[userId, token]
		);
		const refreshToken = rows[0];

		return new RefreshTokenDocument(refreshToken);
	}

	static async getByUserId(userId: number) {
		const {rows} = await Db.query<RefreshTokenFromDb>(
			"SELECT * FROM refresh_tokens WHERE user_id=$1;",
			[userId]
		);
		const refreshToken = rows[0];
		if (!refreshToken) {
			return null;
		}

		return new RefreshTokenDocument(refreshToken);
	}

	static async getByToken(token: string) {
		const {rows} = await Db.query<RefreshTokenFromDb>(
			"SELECT * FROM refresh_tokens WHERE token=$1;",
			[token]
		);
		const refreshToken = rows[0];
		if (!refreshToken) {
			return null;
		}

		return new RefreshTokenDocument(refreshToken);
	}

	static async deleteByToken(token: string) {
		await Db.query<RefreshTokenFromDb>(
			"DELETE FROM refresh_tokens WHERE token=$1;",
			[token]
		);
	}
}

export default RefreshTokenModel;
