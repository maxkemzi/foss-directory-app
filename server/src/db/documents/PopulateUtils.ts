import {ProjectFromDb, RoleFromDb, TagFromDb, UserFromDb} from "#src/types/db";
import {
	PopulatedProjectMessageDocument,
	PopulatedProjectDocument,
	PopulatedProjectRequestDocument,
	PopulatedProjectContributorDocument
} from "#src/types/db/documents";
import {QueryResult} from "pg";
import Db from "../Db";
import ProjectDocument from "./ProjectDocument";
import ProjectMessageDocument from "./ProjectMessageDocument";
import ProjectRequestDocument from "./ProjectRequestDocument";
import RoleDocument from "./RoleDocument";
import TagDocument from "./TagDocument";
import UserDocument from "./UserDocument";
import ProjectContributorDocument from "./ProjectContributorDocument";

class PopulateUtils {
	static async populateProject(
		document: ProjectDocument,
		userId?: string
	): Promise<PopulatedProjectDocument> {
		const {ownerId, id} = document;

		const queries: Promise<QueryResult>[] = [
			Db.query<UserFromDb>("SELECT * FROM users WHERE id=$1;", [ownerId]),
			Db.query<TagFromDb>(
				`
				SELECT *
				FROM (
					SELECT pt.id, t.name, pt.created_at, pt.updated_at, row_number() OVER (ORDER BY pt.created_at) as seq_num
					FROM projects_tags pt
					JOIN tags t ON pt.tag_id = t.id
					WHERE pt.project_id = $1
					UNION ALL
					SELECT id, name, created_at, updated_at, row_number() OVER (ORDER BY created_at) as seq_num
					FROM projects_tags
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
					FROM projects_roles pr
					JOIN roles r ON pr.role_id = r.id
					WHERE pr.project_id = $1 AND pr.places_available > 0
					UNION ALL
					SELECT id, name, places_available, created_at, updated_at, row_number() OVER (ORDER BY created_at) as seq_num
					FROM projects_roles
					WHERE project_id = $1 AND role_id IS NULL AND places_available > 0
				) AS combined ORDER BY combined.seq_num;
				`,
				[id]
			),
			Db.query<{count: number}>(
				`
				SELECT COUNT(*) FROM projects_contributors
				WHERE project_id = $1;
				`,
				[id]
			)
		];

		if (userId) {
			queries.push(
				Db.query<{count: string}>(
					`
					SELECT COUNT(*) FROM projects_contributors
					WHERE project_id = $1 AND user_id = $2;
					`,
					[id, userId]
				)
			);
		}

		const [
			ownerResult,
			tagsResult,
			rolesResult,
			contributorCountResult,
			requestableResult
		] = await Promise.all(queries);

		return {
			...document.toObject(),
			owner: new UserDocument(ownerResult.rows[0]).toObject(),
			tags: tagsResult.rows.map(t => new TagDocument(t).toObject()),
			roles: rolesResult.rows.map(r => ({
				...new RoleDocument(r).toObject(),
				placesAvailable: r.places_available
			})),
			contributorCount: Number(contributorCountResult.rows[0].count),
			requestable: userId
				? userId !== document.ownerId &&
					Number(requestableResult.rows[0].count) === 0
				: false
		};
	}

	static async populateProjectRequest(
		document: ProjectRequestDocument
	): Promise<PopulatedProjectRequestDocument> {
		const {requesterId, projectRoleId} = document;

		const [userResult, projectResult, roleResult] = await Promise.all([
			Db.query<UserFromDb>("SELECT * FROM users WHERE id = $1;", [requesterId]),
			Db.query<ProjectFromDb>(
				`
				SELECT p.*
				FROM projects_roles pr
				JOIN projects p ON pr.project_id = p.id
				WHERE pr.id = $1;
				`,
				[projectRoleId]
			),
			Db.query<RoleFromDb & {places_available: number}>(
				`
				SELECT *
				FROM (
					SELECT pr.id, r.name, pr.places_available, pr.created_at, pr.updated_at, row_number() OVER (ORDER BY pr.created_at) as seq_num
					FROM projects_roles pr
					JOIN roles r ON pr.role_id = r.id
					WHERE pr.id = $1 AND pr.places_available > 0
					UNION ALL
					SELECT id, name, places_available, created_at, updated_at, row_number() OVER (ORDER BY created_at) as seq_num
					FROM projects_roles
					WHERE id = $1 AND role_id IS NULL AND places_available > 0
				) AS combined ORDER BY combined.seq_num;
			`,
				[projectRoleId]
			)
		]);

		return {
			...document.toObject(),
			requester: new UserDocument(userResult.rows[0]).toObject(),
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
			Db.query<ProjectFromDb>("SELECT * FROM projects WHERE id = $1;", [
				projectId
			])
		];

		if (userId) {
			queries.push(
				Db.query<UserFromDb>(`SELECT * FROM users WHERE id = $1;`, [userId])
			);
			queries.push(
				Db.query<RoleFromDb>(
					`
				SELECT *
				FROM (
					SELECT pr.id, r.name, pr.created_at, pr.updated_at, row_number() OVER (ORDER BY pr.created_at) as seq_num
					FROM projects_contributors pc
					JOIN projects_roles pr ON pc.project_role_id = pr.id
					JOIN roles r ON pr.role_id = r.id
					WHERE pc.project_id = $1 AND pc.user_id = $2
					UNION ALL
					SELECT pr.id, pr.name, pr.created_at, pr.updated_at, row_number() OVER (ORDER BY pr.created_at) as seq_num
					FROM projects_contributors pc
					JOIN projects_roles pr ON pc.project_role_id = pr.id
					WHERE pc.project_id = $1 AND pc.user_id = $2 AND pr.role_id IS NULL
				) AS combined ORDER BY combined.seq_num;
			`,
					[projectId, userId]
				)
			);
			queries.push(
				Db.query<{is_owner: boolean}>(
					`
				SELECT pc.is_owner
				FROM projects_contributors pc
				JOIN users u ON pc.user_id = u.id
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

	static async populateProjectContributor(
		document: ProjectContributorDocument
	): Promise<PopulatedProjectContributorDocument> {
		const {projectId, userId} = document;

		const queries: Promise<QueryResult>[] = [
			Db.query<UserFromDb>("SELECT * FROM users WHERE id = $1;", [userId]),
			Db.query<RoleFromDb>(
				`
				SELECT *
				FROM (
					SELECT pr.id, r.name, pr.created_at, pr.updated_at, row_number() OVER (ORDER BY pr.created_at) as seq_num
					FROM projects_contributors pc
					JOIN projects_roles pr ON pc.project_role_id = pr.id
					JOIN roles r ON pr.role_id = r.id
					WHERE pc.project_id = $1 AND pc.user_id = $2
					UNION ALL
					SELECT pr.id, pr.name, pr.created_at, pr.updated_at, row_number() OVER (ORDER BY pr.created_at) as seq_num
					FROM projects_contributors pc
					JOIN projects_roles pr ON pc.project_role_id = pr.id
					WHERE pc.project_id = $1 AND pc.user_id = $2 AND pr.role_id IS NULL
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
