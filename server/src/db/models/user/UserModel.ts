import Db from "../../Db";
import {User, UserPayload} from "./types";

class UserModel {
	static async create({username, email, password}: UserPayload): Promise<User> {
		const {rows} = await Db.query<User>(
			"INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *;",
			[username, email, password]
		);
		return rows[0];
	}

	static async findById(id: User["id"]) {
		const {rows} = await Db.query<User>("SELECT * FROM users WHERE id=$1;", [
			id
		]);
		return rows[0];
	}

	static async findByUsername(username: User["username"]) {
		const {rows} = await Db.query<User>(
			"SELECT * FROM users WHERE username=$1;",
			[username]
		);
		return rows[0];
	}

	static async findByEmail(email: User["email"]) {
		const {rows} = await Db.query<User>("SELECT * FROM users WHERE email=$1;", [
			email
		]);
		return rows[0];
	}

	static async deleteById(id: User["id"]) {
		await Db.query<User>("DELETE FROM users WHERE id=$1;", [id]);
	}
}

export default UserModel;
