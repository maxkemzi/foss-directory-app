import UserDocument from "#src/db/documents/UserDocument";
import {
	ProjectDocument,
	ProjectRequestDocument,
	UserDocument as UserDocumentType,
	UserFromDb,
	UserPayload
} from "#src/db/types";
import Model from "../Model";
import {UserModelImpl} from "./types";

class UserModel extends Model implements UserModelImpl {
	async insert(payload: UserPayload): Promise<UserDocument> {
		const {username, email, password, avatar} = payload;

		const {
			rows: [user]
		} = await this.client.query<UserFromDb>(
			"INSERT INTO user_account(username, email, password, avatar) VALUES($1, $2, $3, $4) RETURNING *;",
			[username, email, password, avatar]
		);

		return new UserDocument(user);
	}

	async findById(id: UserDocumentType["id"]): Promise<UserDocument | null> {
		const {
			rows: [user]
		} = await this.client.query<UserFromDb>(
			"SELECT * FROM user_account WHERE id = $1;",
			[id]
		);

		return user ? new UserDocument(user) : null;
	}

	async findByUsername(
		username: UserDocumentType["username"]
	): Promise<UserDocument | null> {
		const {
			rows: [user]
		} = await this.client.query<UserFromDb>(
			"SELECT * FROM user_account WHERE username = $1;",
			[username]
		);

		return user ? new UserDocument(user) : null;
	}

	async findByEmail(
		email: UserDocumentType["email"]
	): Promise<UserDocument | null> {
		const {
			rows: [user]
		} = await this.client.query<UserFromDb>(
			"SELECT * FROM user_account WHERE email = $1;",
			[email]
		);

		return user ? new UserDocument(user) : null;
	}

	async deleteById(id: UserDocumentType["id"]): Promise<void> {
		await this.client.query<UserFromDb>(
			"DELETE FROM user_account WHERE id = $1;",
			[id]
		);
	}

	async isProjectOwner(
		projectId: ProjectDocument["id"],
		userId: UserDocumentType["id"]
	): Promise<boolean> {
		const {
			rows: [{count}]
		} = await this.client.query<{count: string}>(
			"SELECT COUNT(*) FROM project WHERE id = $1 AND owner_user_account_id = $2;",
			[projectId, userId]
		);

		return Number(count) > 0;
	}

	async isProjectMember(
		projectId: ProjectDocument["id"],
		userId: UserDocumentType["id"]
	): Promise<boolean> {
		const {
			rows: [{count}]
		} = await this.client.query<{count: string}>(
			`
			SELECT COUNT(*) FROM project_user_accounts
			WHERE project_id = $1 AND user_account_id = $2;
			`,
			[projectId, userId]
		);

		return Number(count) > 0;
	}

	async isProjectRequestReceiver(
		projectRequestId: ProjectRequestDocument["id"],
		userId: UserDocumentType["id"]
	): Promise<boolean> {
		const {
			rows: [{count}]
		} = await this.client.query<{count: string}>(
			`
			SELECT COUNT(*) FROM project_requests pr
			JOIN project p ON pr.project_id = p.id
			WHERE pr.id = $1 AND p.owner_user_account_id = $2;
			`,
			[projectRequestId, userId]
		);

		return Number(count) > 0;
	}

	async isConnectedToGithub(userId: UserDocumentType["id"]): Promise<boolean> {
		const {
			rows: [{count}]
		} = await this.client.query<{count: string}>(
			"SELECT COUNT(*) FROM github_connection WHERE user_account_id = $1;",
			[userId]
		);

		return Number(count) > 0;
	}
}

export default UserModel;
