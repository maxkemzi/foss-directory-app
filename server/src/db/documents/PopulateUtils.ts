import {ProjectFromDb, RoleFromDb, TagFromDb, UserFromDb} from "#src/types/db";
import {
	PopulatedProjectUserDocument,
	PopulatedProjectDocument,
	PopulatedProjectMessageDocument,
	PopulatedProjectRequestDocument
} from "#src/types/db/documents";
import {QueryResult} from "pg";
import Db from "../Db";
import ProjectDocument from "./ProjectDocument";
import ProjectMessageDocument from "./ProjectMessageDocument";
import ProjectRequestDocument from "./ProjectRequestDocument";
import ProjectUserDocument from "./ProjectUserDocument";
import RoleDocument from "./RoleDocument";
import TagDocument from "./TagDocument";
import UserDocument from "./UserDocument";

class PopulateUtils {
	static async populateProject(
		document: ProjectDocument,
		userId?: string
	): Promise<PopulatedProjectDocument> {
		const {ownerUserId, id} = document;

		const queries: Promise<QueryResult>[] = [
			Db.query<UserFromDb>("SELECT * FROM user_account WHERE id=$1;", [
				ownerUserId
			]),
			Db.query<TagFromDb>(
				`
				SELECT *
				FROM (
					SELECT pt.id, t.name, pt.created_at, pt.updated_at, row_number() OVER (ORDER BY pt.created_at) as seq_num
					FROM project_tags pt
					JOIN tag t ON pt.tag_id = t.id
					WHERE pt.project_id = $1
					UNION ALL
					SELECT id, name, created_at, updated_at, row_number() OVER (ORDER BY created_at) as seq_num
					FROM project_tags
					WHERE project_id = $1 AND tag_id IS NULL
				) AS combined ORDER BY combined.seq_num;
				`,
				[id]
			),
			Db.query<RoleFromDb & {places_available: number}>(
				`
				SELECT *
				FROM (
					SELECT pr.id, r.name, pr.places_available, pr.created_at, pr.updated_at, row_number() OVER (ORDER BY pr.created_at) as seq_num
					FROM project_roles pr
					JOIN role r ON pr.role_id = r.id
					WHERE pr.project_id = $1 AND pr.places_available > 0
					UNION ALL
					SELECT id, name, places_available, created_at, updated_at, row_number() OVER (ORDER BY created_at) as seq_num
					FROM project_roles
					WHERE project_id = $1 AND role_id IS NULL AND places_available > 0
				) AS combined ORDER BY combined.seq_num;
				`,
				[id]
			),
			Db.query<{count: number}>(
				`
				SELECT COUNT(*) FROM project_user_accounts
				WHERE project_id = $1;
				`,
				[id]
			)
		];

		if (userId) {
			queries.push(
				Db.query<{count: string}>(
					`
					SELECT COUNT(*) FROM project_user_accounts
					WHERE project_id = $1 AND user_account_id = $2;
					`,
					[id, userId]
				)
			);
		}

		const [
			ownerResult,
			tagsResult,
			rolesResult,
			userCountResult,
			requestableResult
		] = await Promise.all(queries);

		return {
			...document.toObject(),
			ownerUser: new UserDocument(ownerResult.rows[0]).toObject(),
			tags: tagsResult.rows.map(t => new TagDocument(t).toObject()),
			roles: rolesResult.rows.map(r => ({
				...new RoleDocument(r).toObject(),
				placesAvailable: r.places_available
			})),
			userCount: Number(userCountResult.rows[0].count),
			requestable: userId
				? userId !== document.ownerUserId &&
					Number(requestableResult.rows[0].count) === 0
				: false
		};
	}

	static async populateProjectRequest(
		document: ProjectRequestDocument
	): Promise<PopulatedProjectRequestDocument> {
		const {userId, projectRoleId} = document;

		const [userResult, projectResult, roleResult] = await Promise.all([
			Db.query<UserFromDb>("SELECT * FROM user_account WHERE id = $1;", [
				userId
			]),
			Db.query<ProjectFromDb>(
				`
				SELECT p.*
				FROM project_roles pr
				JOIN project p ON pr.project_id = p.id
				WHERE pr.id = $1;
				`,
				[projectRoleId]
			),
			Db.query<RoleFromDb & {places_available: number}>(
				`
				SELECT *
				FROM (
					SELECT pr.id, r.name, pr.places_available, pr.created_at, pr.updated_at, row_number() OVER (ORDER BY pr.created_at) as seq_num
					FROM project_roles pr
					JOIN role r ON pr.role_id = r.id
					WHERE pr.id = $1 AND pr.places_available > 0
					UNION ALL
					SELECT id, name, places_available, created_at, updated_at, row_number() OVER (ORDER BY created_at) as seq_num
					FROM project_roles
					WHERE id = $1 AND role_id IS NULL AND places_available > 0
				) AS combined ORDER BY combined.seq_num;
			`,
				[projectRoleId]
			)
		]);

		return {
			...document.toObject(),
			user: new UserDocument(userResult.rows[0]).toObject(),
			project: new ProjectDocument(projectResult.rows[0]).toObject(),
			role: {
				...new RoleDocument(roleResult.rows[0]).toObject(),
				placesAvailable: roleResult.rows[0].places_available
			}
		};
	}

	static async populateProjectMessage(
		document: ProjectMessageDocument
	): Promise<PopulatedProjectMessageDocument> {
		const {projectId, userId} = document;

		const queries: Promise<QueryResult>[] = [
			Db.query<ProjectFromDb>("SELECT * FROM project WHERE id = $1;", [
				projectId
			])
		];

		if (userId) {
			queries.push(
				Db.query<UserFromDb>(`SELECT * FROM user_account WHERE id = $1;`, [
					userId
				])
			);
			queries.push(
				Db.query<RoleFromDb>(
					`
				SELECT *
				FROM (
					SELECT pr.id, r.name, pr.created_at, pr.updated_at, row_number() OVER (ORDER BY pr.created_at) as seq_num
					FROM project_user_accounts pua
					JOIN project_roles pr ON pua.project_role_id = pr.id
					JOIN role r ON pr.role_id = r.id
					WHERE pua.project_id = $1 AND pua.user_account_id = $2
					UNION ALL
					SELECT pr.id, pr.name, pr.created_at, pr.updated_at, row_number() OVER (ORDER BY pr.created_at) as seq_num
					FROM project_user_accounts pua
					JOIN project_roles pr ON pua.project_role_id = pr.id
					WHERE pua.project_id = $1 AND pua.user_account_id = $2 AND pr.role_id IS NULL
				) AS combined ORDER BY combined.seq_num;
			`,
					[projectId, userId]
				)
			);
			queries.push(
				Db.query<{is_owner: boolean}>(
					`
				SELECT pua.is_owner
				FROM project_user_accounts pua
				JOIN user_account u ON pua.user_account_id = u.id
				WHERE u.id = $1;
				`,
					[userId]
				)
			);
		}

		const [projectResult, userResult, roleResult, isOwnerResult] =
			await Promise.all(queries);

		return {
			...document.toObject(),
			project: new ProjectDocument(projectResult.rows[0]).toObject(),
			sender: userId
				? {
						user: new UserDocument(userResult.rows[0]).toObject(),
						role: roleResult.rows[0]
							? new RoleDocument(roleResult.rows[0]).toObject()
							: null,
						isOwner: isOwnerResult.rows[0]
							? isOwnerResult.rows[0].is_owner
							: false
					}
				: null
		};
	}

	static async populateProjectUser(
		document: ProjectUserDocument
	): Promise<PopulatedProjectUserDocument> {
		const {projectId, userId} = document;

		const queries: Promise<QueryResult>[] = [
			Db.query<UserFromDb>("SELECT * FROM user_account WHERE id = $1;", [
				userId
			]),
			Db.query<RoleFromDb>(
				`
				SELECT *
				FROM (
					SELECT pr.id, r.name, pr.created_at, pr.updated_at, row_number() OVER (ORDER BY pr.created_at) as seq_num
					FROM project_user_accounts pua
					JOIN project_roles pr ON pua.project_role_id = pr.id
					JOIN role r ON pr.role_id = r.id
					WHERE pua.project_id = $1 AND pua.user_account_id = $2
					UNION ALL
					SELECT pr.id, pr.name, pr.created_at, pr.updated_at, row_number() OVER (ORDER BY pr.created_at) as seq_num
					FROM project_user_accounts pua
					JOIN project_roles pr ON pua.project_role_id = pr.id
					WHERE pua.project_id = $1 AND pua.user_account_id = $2 AND pr.role_id IS NULL
				) AS combined ORDER BY combined.seq_num;
				`,
				[projectId, userId]
			)
		];

		const [userResult, roleResult] = await Promise.all(queries);

		return {
			...document.toObject(),
			user: new UserDocument(userResult.rows[0]).toObject(),
			role: new RoleDocument(roleResult.rows[0]).toObject()
		};
	}
}

export default PopulateUtils;
