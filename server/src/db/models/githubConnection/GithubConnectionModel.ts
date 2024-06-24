import {GithubConnectionDocument} from "#src/db/documents";
import {GithubConnectionFromDb, GithubConnectionPayload} from "#src/db/types";
import Model from "../Model";
import {GithubConnectionModelImpl} from "./types";

class GithubConnectionModel extends Model implements GithubConnectionModelImpl {
	async insert(
		payload: GithubConnectionPayload
	): Promise<GithubConnectionDocument> {
		const {userId, token} = payload;

		const {
			rows: [connection]
		} = await this.client.query<GithubConnectionFromDb>(
			"INSERT INTO github_connection(user_account_id, token) VALUES($1, $2) RETURNING *;",
			[userId, token]
		);

		return new GithubConnectionDocument(connection);
	}

	async findByUserId(
		userId: GithubConnectionPayload["userId"]
	): Promise<GithubConnectionDocument | null> {
		const {
			rows: [connection]
		} = await this.client.query<GithubConnectionFromDb>(
			"SELECT * FROM github_connection WHERE user_account_id = $1;",
			[userId]
		);

		return connection ? new GithubConnectionDocument(connection) : null;
	}
}

export default GithubConnectionModel;
