import Db from "../../Db";
import {GithubConnection, GithubConnectionPayload} from "./types";

class GithubConnectionModel {
	static async create({
		user_id,
		token
	}: GithubConnectionPayload): Promise<GithubConnection> {
		const {rows} = await Db.query<GithubConnection>(
			"INSERT INTO github_connections(user_id, token) VALUES($1, $2) RETURNING *;",
			[user_id, token]
		);
		return rows[0];
	}

	static async findByUserId(userId: number): Promise<GithubConnection | null> {
		const {rows} = await Db.query<GithubConnection>(
			"SELECT * FROM github_connections WHERE user_id=$1;",
			[userId]
		);
		return rows[0];
	}
}

export default GithubConnectionModel;
