import {
	ProjectFromDb,
	ProjectRoleFromDb,
	ProjectTagFromDb,
	RoleFromDb,
	UserFromDb
} from "#src/types/db";
import {
	PopulatedProjectDocument,
	PopulatedProjectRoleDocument,
	PopulatedProjectRequestDocument,
	PopulatedProjectTagDocument
} from "#src/types/db/documents";
import Db from "../Db";
import ProjectDocument from "./ProjectDocument";
import ProjectRoleRequestDocument from "./ProjectRequestDocument";
import ProjectRoleDocument from "./ProjectRoleDocument";
import ProjectTagDocument from "./ProjectTagDocument";
import RoleDocument from "./RoleDocument";
import TagDocument from "./TagDocument";
import UserDocument from "./UserDocument";

class PopulateUtils {
	static async populateProject(
		document: ProjectDocument
	): Promise<PopulatedProjectDocument> {
		const [
			{
				rows: [user]
			},
			{rows: projectTags},
			{rows: projectRoles}
		] = await Promise.all([
			Db.query<UserFromDb>("SELECT * FROM users WHERE id=$1;", [
				document.ownerId
			]),
			Db.query<ProjectTagFromDb>(
				`SELECT * FROM projects_tags WHERE project_id = $1;`,
				[document.id]
			),
			Db.query<ProjectRoleFromDb>(
				`SELECT * FROM projects_roles WHERE project_id = $1;`,
				[document.id]
			)
		]);

		const Owner = new UserDocument(user).toObject();
		const ProjectTags = await Promise.all(
			projectTags.map(pt =>
				PopulateUtils.populateProjectTag(new ProjectTagDocument(pt))
			)
		);
		const ProjectRoles = await Promise.all(
			projectRoles.map(pr =>
				PopulateUtils.populateProjectRole(new ProjectRoleDocument(pr))
			)
		);

		return {
			...document.toObject(),
			Owner,
			ProjectTags,
			ProjectRoles
		};
	}

	static async populateProjectTag(
		document: ProjectTagDocument
	): Promise<PopulatedProjectTagDocument> {
		const [
			{
				rows: [project]
			},
			{
				rows: [tag]
			}
		] = await Promise.all([
			Db.query<ProjectFromDb>("SELECT * FROM projects WHERE id=$1;", [
				document.projectId
			]),
			Db.query<RoleFromDb>(`SELECT * FROM tags WHERE id=$1;`, [document.tagId])
		]);

		const Project = new ProjectDocument(project).toObject();
		const Tag = new TagDocument(tag).toObject();

		return {
			...document.toObject(),
			Project,
			Tag
		};
	}

	static async populateProjectRole(
		document: ProjectRoleDocument
	): Promise<PopulatedProjectRoleDocument> {
		const [
			{
				rows: [project]
			},
			{
				rows: [role]
			}
		] = await Promise.all([
			Db.query<ProjectFromDb>("SELECT * FROM projects WHERE id=$1;", [
				document.projectId
			]),
			Db.query<RoleFromDb>(`SELECT * FROM roles WHERE id=$1;`, [
				document.roleId
			])
		]);

		return {
			...document.toObject(),
			Project: new ProjectDocument(project).toObject(),
			Role: new RoleDocument(role).toObject()
		};
	}

	static async populateProjectRoleRequest(
		document: ProjectRoleRequestDocument
	): Promise<PopulatedProjectRequestDocument> {
		const [
			{
				rows: [user]
			},
			{
				rows: [projectRole]
			}
		] = await Promise.all([
			Db.query<UserFromDb>("SELECT * FROM users WHERE id=$1;", [
				document.requestorId
			]),
			Db.query<any>(`SELECT * FROM projects_roles WHERE id=$1;`, [
				document.projectRoleId
			])
		]);

		const Requestor = new UserDocument(user).toObject();
		const ProjectRole = await PopulateUtils.populateProjectRole(
			new ProjectRoleDocument(projectRole)
		);

		return {
			...document.toObject(),
			Requestor,
			ProjectRole
		};
	}
}

export default PopulateUtils;
