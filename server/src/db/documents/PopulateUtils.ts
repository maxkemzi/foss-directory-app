import {ProjectFromDb, RoleFromDb, TagFromDb, UserFromDb} from "#src/types/db";
import {
	PopulatedProjectMessageDocument,
	PopulatedProjectDocument,
	PopulatedProjectRequestDocument
} from "#src/types/db/documents";
import {QueryResult} from "pg";
import Db from "../Db";
import ProjectDocument from "./ProjectDocument";
import MessageDocument from "./ProjectMessageDocument";
import ProjectRequestDocument from "./ProjectRequestDocument";
import RoleDocument from "./RoleDocument";
import TagDocument from "./TagDocument";
import UserDocument from "./UserDocument";

class PopulateUtils {
	static async populateProject(
		document: ProjectDocument,
		userId?: string
	): Promise<PopulatedProjectDocument> {
		const [
			{
				rows: [user]
			},
			{rows: tags},
			{rows: roles},
			requestableResult
		] = await Promise.all([
			Db.query<UserFromDb>("SELECT * FROM users WHERE id=$1;", [
				document.ownerId
			]),
			Db.query<TagFromDb>(
				`
				SELECT *
				FROM (
					SELECT pt.id, t.name, pt.created_at, pt.updated_at
					FROM projects_tags pt
					JOIN tags t ON pt.tag_id = t.id
					WHERE pt.project_id = $1
					UNION
					SELECT id, name, created_at, updated_at
					FROM projects_tags
					WHERE project_id = $1 AND tag_id IS NULL
				);
				`,
				[document.id]
			),
			Db.query<RoleFromDb & {places_available: number}>(
				`
				SELECT *
				FROM (
					SELECT pr.id, r.name, pr.places_available, pr.created_at, pr.updated_at
					FROM projects_roles pr
					JOIN roles r ON pr.role_id = r.id
					WHERE pr.project_id = $1 AND pr.places_available > 0
					UNION
					SELECT id, name, places_available, created_at, updated_at
					FROM projects_roles
					WHERE project_id = $1 AND role_id IS NULL AND places_available > 0
				);
				`,
				[document.id]
			),
			...(userId
				? [
						Db.query<{count: number}>(
							`
				SELECT COUNT(*) FROM projects_contributors
				WHERE project_id = $1 AND user_id = $2;
				`,
							[document.id, userId]
						)
					]
				: [])
		]);

		return {
			...document.toObject(),
			owner: new UserDocument(user).toObject(),
			tags: tags.map(t => new TagDocument(t).toObject()),
			roles: roles.map(r => ({
				...new RoleDocument(r).toObject(),
				placesAvailable: r.places_available
			})),
			requestable: userId
				? userId !== document.ownerId &&
					Number(requestableResult.rows[0].count) === 0
				: false
		};
	}

	static async populateProjectRequest(
		document: ProjectRequestDocument
	): Promise<PopulatedProjectRequestDocument> {
		const [
			{
				rows: [user]
			},
			{
				rows: [project]
			},
			{
				rows: [role]
			}
		] = await Promise.all([
			Db.query<UserFromDb>("SELECT * FROM users WHERE id = $1;", [
				document.requesterId
			]),
			Db.query<ProjectFromDb>(
				`
				SELECT p.*
				FROM projects_roles pr
				JOIN projects p ON pr.project_id = p.id
				WHERE pr.id = $1;
				`,
				[document.projectRoleId]
			),
			Db.query<RoleFromDb & {places_available: number}>(
				`
				SELECT *
				FROM (
					SELECT pr.id, r.name, pr.places_available, pr.created_at, pr.updated_at
					FROM projects_roles pr
					JOIN roles r ON pr.role_id = r.id
					WHERE pr.id = $1 AND pr.places_available > 0
					UNION
					SELECT id, name, places_available, created_at, updated_at
					FROM projects_roles
					WHERE id = $1 AND role_id IS NULL AND places_available > 0
				);
			`,
				[document.projectRoleId]
			)
		]);

		return {
			...document.toObject(),
			requester: new UserDocument(user).toObject(),
			project: new ProjectDocument(project).toObject(),
			role: {
				...new RoleDocument(role).toObject(),
				placesAvailable: role.places_available
			}
		};
	}

	static async populateProjectMessage(
		document: MessageDocument
	): Promise<PopulatedProjectMessageDocument> {
		const {projectId, userId} = document;

		const queries: Promise<QueryResult>[] = [
			Db.query<ProjectFromDb>("SELECT * FROM projects WHERE id = $1;", [
				projectId
			])
		];

		if (userId) {
			queries.push(
				Db.query<UserFromDb & {is_owner: boolean}>(
					`
				SELECT u.*, pc.is_owner
				FROM projects_contributors pc
				JOIN users u ON pc.user_id = u.id
				WHERE u.id = $1;
				`,
					[userId]
				)
			);
			queries.push(
				Db.query<RoleFromDb>(
					`
				SELECT *
				FROM (
					SELECT pr.id, r.name, pr.created_at, pr.updated_at
					FROM projects_contributors pc
					JOIN projects_roles pr ON pc.project_role_id = pr.id
					JOIN roles r ON pr.role_id = r.id
					WHERE pc.user_id = $1
					UNION
					SELECT pr.id, pr.name, pr.created_at, pr.updated_at
					FROM projects_contributors pc
					JOIN projects_roles pr ON pc.project_role_id = pr.id
					WHERE pc.user_id = $1 AND pr.role_id IS NULL
				);
			`,
					[userId]
				)
			);
		}

		const [projectSelect, userSelect, userRoleSelect] =
			await Promise.all(queries);

		const project = new ProjectDocument(projectSelect.rows[0]).toObject();

		const userRow = userSelect.rows[0];
		const userRoleRow = userRoleSelect.rows[0];
		const user =
			userRow && userRoleRow
				? {
						...new UserDocument(userRow).toObject(),
						role: new RoleDocument(userRoleRow).toObject(),
						isOwner: userRoleRow.is_owner
					}
				: null;

		return {
			...document.toObject(),
			project,
			user
		};
	}
}

export default PopulateUtils;
