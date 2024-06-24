import {ProjectUserDocument} from "#src/db/documents";
import {
	ProjectDocument,
	ProjectUserFromDb,
	ProjectUserPayload,
	UserDocument
} from "#src/db/types";
import Model from "../Model";
import {FindOptions, ProjectUserModelImpl} from "./types";

class ProjectUserModel extends Model implements ProjectUserModelImpl {
	async insert(payload: ProjectUserPayload): Promise<ProjectUserDocument> {
		const {userId, projectId, projectRoleId, isOwner = false} = payload;

		const {
			rows: [user]
		} = await this.client.query<ProjectUserFromDb>(
			"INSERT INTO project_user_accounts(user_account_id, project_id, project_role_id, is_owner) VALUES($1, $2, $3, $4) RETURNING *;",
			[userId, projectId, projectRoleId, isOwner]
		);

		return new ProjectUserDocument(user);
	}

	async findByProjectId(
		id: ProjectDocument["id"],
		opts: FindOptions = {}
	): Promise<ProjectUserDocument[]> {
		const {limit, offset} = opts;

		let query = "SELECT * FROM project_user_accounts WHERE project_id = $1";

		query += ` ORDER BY created_at DESC, serial_id DESC`;

		if (limit) {
			query += ` LIMIT ${limit}`;
		}

		if (offset) {
			query += ` OFFSET ${offset}`;
		}

		const {rows: users} = await this.client.query<ProjectUserFromDb>(
			`${query};`,
			[id]
		);

		return users.map(u => new ProjectUserDocument(u));
	}

	async countByProjectId(id: ProjectDocument["id"]): Promise<number> {
		const {
			rows: [{count}]
		} = await this.client.query<{count: string}>(
			"SELECT COUNT(*) FROM project_user_accounts WHERE project_id = $1;",
			[id]
		);

		return Number(count);
	}

	async findByProjectAndUserIds(
		projectId: ProjectDocument["id"],
		userId: UserDocument["id"]
	): Promise<ProjectUserDocument | null> {
		const {
			rows: [user]
		} = await this.client.query<ProjectUserFromDb>(
			"SELECT * FROM project_user_accounts WHERE project_id = $1 AND user_account_id = $2;",
			[projectId, userId]
		);

		return user ? new ProjectUserDocument(user) : null;
	}

	async deleteByProjectAndUserIds(
		projectId: ProjectDocument["id"],
		userId: UserDocument["id"]
	): Promise<void> {
		await this.client.query(
			"DELETE FROM project_user_accounts WHERE project_id = $1 AND user_account_id = $2;",
			[projectId, userId]
		);
	}
}

export default ProjectUserModel;
