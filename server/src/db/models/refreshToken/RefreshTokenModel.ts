import Db from "../../Db";
import {RefreshToken, RefreshTokenPayload} from "./types";

class RefreshTokenModel {
	static async create({
		user_id,
		token
	}: RefreshTokenPayload): Promise<RefreshToken> {
		const {rows} = await Db.query<RefreshToken>(
			"INSERT INTO refresh_tokens(user_id, token) VALUES($1, $2) RETURNING *;",
			[user_id, token]
		);
		return rows[0];
	}

	static async upsert({
		user_id,
		token
	}: RefreshTokenPayload): Promise<RefreshToken> {
		const {rows} = await Db.query<RefreshToken>(
			"INSERT INTO refresh_tokens(user_id, token) VALUES($1, $2) ON CONFLICT(user_id) DO UPDATE SET user_id=EXCLUDED.user_id, token=EXCLUDED.token RETURNING *;",
			[user_id, token]
		);
		return rows[0];
	}

	static async updateByUserId(
		userId: RefreshToken["user_id"],
		payload: RefreshTokenPayload
	) {
		const {rows} = await Db.query<RefreshToken>(
			"UPDATE refresh_tokens SET user_id=$1, token=$2 WHERE user_id=$3;",
			[payload.user_id, payload.token, userId]
		);
		return rows[0];
	}

	static async findByUserId(userId: RefreshToken["user_id"]) {
		const {rows} = await Db.query<RefreshToken>(
			"SELECT * FROM refresh_tokens WHERE user_id=$1;",
			[userId]
		);
		return rows[0];
	}

	static async findByToken(token: RefreshToken["token"]) {
		const {rows} = await Db.query<RefreshToken>(
			"SELECT * FROM refresh_tokens WHERE token=$1;",
			[token]
		);
		return rows[0];
	}

	static async findById(id: RefreshToken["id"]) {
		const {rows} = await Db.query<RefreshToken>(
			"SELECT * FROM refresh_tokens WHERE id=$1;",
			[id]
		);
		return rows[0];
	}

	static async deleteByToken(token: RefreshToken["token"]) {
		await Db.query<RefreshToken>("DELETE FROM refresh_tokens WHERE token=$1;", [
			token
		]);
	}
}

export default RefreshTokenModel;
