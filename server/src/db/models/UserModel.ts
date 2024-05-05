import {UserFromDb} from "#src/types/db";
import {UserPayload} from "#src/types/db/models";
import Db from "../Db";
import {UserDocument} from "../documents";

class UserModel {
	static async create({
		username,
		email,
		password
	}: UserPayload): Promise<UserDocument> {
		const {rows} = await Db.query<UserFromDb>(
			"INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *;",
			[username, email, password]
		);
		const user = rows[0];

		return new UserDocument(user);
	}

	static async getById(id: number): Promise<UserDocument | null> {
		const {rows} = await Db.query<UserFromDb>(
			"SELECT * FROM users WHERE id=$1;",
			[id]
		);
		const user = rows[0];
		if (!user) {
			return null;
		}

		return new UserDocument(user);
	}

	static async getByUsername(username: string): Promise<UserDocument | null> {
		const {rows} = await Db.query<UserFromDb>(
			"SELECT * FROM users WHERE username=$1;",
			[username]
		);
		const user = rows[0];
		if (!user) {
			return null;
		}

		return new UserDocument(user);
	}

	static async getByEmail(email: string): Promise<UserDocument | null> {
		const {rows} = await Db.query<UserFromDb>(
			"SELECT * FROM users WHERE email=$1;",
			[email]
		);
		const user = rows[0];
		if (!user) {
			return null;
		}

		return new UserDocument(user);
	}

	static async deleteById(id: number) {
		await Db.query<UserFromDb>("DELETE FROM users WHERE id=$1;", [id]);
	}
}

export default UserModel;
