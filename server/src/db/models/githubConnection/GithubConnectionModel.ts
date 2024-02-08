import Db from "../../Db";
import GithubConnectionDocument from "./GithubConnectionDto";
import {GithubConnectionFromDb, GithubConnectionPayload} from "./types";

class GithubConnectionModel {
	static async create({
		userId,
		token
	}: GithubConnectionPayload): Promise<GithubConnectionDocument> {
		const {rows} = await Db.query<GithubConnectionFromDb>(
			"INSERT INTO github_connections(user_id, token) VALUES($1, $2) RETURNING *;",
			[userId, token]
		);
		const connection = rows[0];

		return new GithubConnectionDocument(connection);
	}

	static async getByUserId(
		userId: number
	): Promise<GithubConnectionDocument | null> {
		const {rows} = await Db.query<GithubConnectionFromDb>(
			"SELECT * FROM github_connections WHERE user_id=$1;",
			[userId]
		);
		const connection = rows[0];
		if (!connection) {
			return null;
		}

		return new GithubConnectionDocument(connection);
	}
}

export default GithubConnectionModel;
