import {UserFromDb} from "#src/types/db";
import {UserPayload} from "#src/types/db/models";
import Db from "../Db";
import {UserDocument} from "../documents";

class UserModel {
	static async create({
		username,
		email,
		password,
		avatar
	}: UserPayload): Promise<UserDocument> {
		const {rows} = await Db.query<UserFromDb>(
			"INSERT INTO users(username, email, password, avatar) VALUES($1, $2, $3, $4) RETURNING *;",
			[username, email, password, avatar]
		);
		const user = rows[0];

		return new UserDocument(user);
	}

	static async getById(id: string): Promise<UserDocument | null> {
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
			"SELECT * FROM users WHERE email = $1;",
			[email]
		);
		const user = rows[0];
		if (!user) {
			return null;
		}

		return new UserDocument(user);
	}

	static async deleteById(id: string): Promise<void> {
		await Db.query<UserFromDb>("DELETE FROM users WHERE id = $1;", [id]);
	}

	static async isProjectOwner({
		projectId,
		userId
	}: {
		projectId: string;
		userId: string;
	}): Promise<boolean> {
		const {rows} = await Db.query<{count: number}>(
			"SELECT COUNT(*) FROM projects WHERE id = $1 AND owner_id = $2;",
			[projectId, userId]
		);
		return rows[0].count > 0;
	}

	static async isProjectContributor({
		projectId,
		userId
	}: {
		projectId: string;
		userId: string;
	}): Promise<boolean> {
		const {rows} = await Db.query<{count: number}>(
			`
			SELECT COUNT(*) FROM projects_contributors
			WHERE project_id = $1 AND user_id = $2;
			`,
			[projectId, userId]
		);
		return rows[0].count > 0;
	}

	static async hasProjectRequestAccess({
		projectRequestId,
		userId
	}: {
		projectRequestId: string;
		userId: string;
	}): Promise<boolean> {
		const {rows} = await Db.query<{count: number}>(
			`
			SELECT COUNT(*) FROM projects_requests pr
			JOIN projects p ON pr.project_id = p.id
			WHERE pr.id = $1 AND p.owner_id = $2;
			`,
			[projectRequestId, userId]
		);
		return rows[0].count > 0;
	}
}

export default UserModel;
