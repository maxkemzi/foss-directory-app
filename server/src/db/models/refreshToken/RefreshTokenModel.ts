import {RefreshTokenDocument} from "#src/db/documents";
import {
	RefreshTokenFromDb,
	RefreshTokenPayload,
	UserDocument,
	RefreshTokenDocument as RefreshTokenDocumentType
} from "#src/db/types";
import Model from "../Model";
import {RefreshTokenModelImpl} from "./types";

class RefreshTokenModel extends Model implements RefreshTokenModelImpl {
	async upsert(payload: RefreshTokenPayload): Promise<RefreshTokenDocument> {
		const {userId, token} = payload;

		const {rows} = await this.client.query<RefreshTokenFromDb>(
			"INSERT INTO refresh_token(user_account_id, token) VALUES($1, $2) ON CONFLICT(user_account_id) DO UPDATE SET token=EXCLUDED.token RETURNING *;",
			[userId, token]
		);

		return new RefreshTokenDocument(rows[0]);
	}

	async findByUserId(
		id: UserDocument["id"]
	): Promise<RefreshTokenDocument | null> {
		const {
			rows: [token]
		} = await this.client.query<RefreshTokenFromDb>(
			"SELECT * FROM refresh_token WHERE user_account_id = $1;",
			[id]
		);

		return token ? new RefreshTokenDocument(token) : null;
	}

	async findByToken(
		token: RefreshTokenDocumentType["token"]
	): Promise<RefreshTokenDocument | null> {
		const {
			rows: [refreshToken]
		} = await this.client.query<RefreshTokenFromDb>(
			"SELECT * FROM refresh_token WHERE token = $1;",
			[token]
		);

		return token ? new RefreshTokenDocument(refreshToken) : null;
	}

	async deleteByToken(token: RefreshTokenDocumentType["token"]): Promise<void> {
		await this.client.query<RefreshTokenFromDb>(
			"DELETE FROM refresh_token WHERE token=$1;",
			[token]
		);
	}
}

export default RefreshTokenModel;
