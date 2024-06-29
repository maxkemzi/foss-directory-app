import {
	Db,
	ProjectDocument,
	ProjectModel,
	ProjectPopulator,
	ProjectRoleModel,
	ProjectTagModel,
	ProjectUserModel,
	RoleModel,
	TagModel,
	UserDocument,
	UserModel
} from "#src/db";
import {ApiErrorInfo, ErrorFactory} from "#src/lib";
import {PoolClient} from "pg";
import {ExtendedProjectDto, ProjectDto} from "../dtos";
import {ProjectExtender} from "../extenders";
import {CreateProjectPayload, GetOptions, GetReturn} from "./types";

/* eslint-disable no-await-in-loop */

class ProjectService {
	static async create(payload: CreateProjectPayload): Promise<ProjectDto> {
		const {
			description,
			name,
			ownerUserId,
			repoUrl,
			role: ownerRole,
			roles,
			tags
		} = payload;

		const client = await Db.getClient();
		const projectModel = new ProjectModel(client);
		const projectRoleModel = new ProjectRoleModel(client);
		const projectTagModel = new ProjectTagModel(client);
		const projectUserModel = new ProjectUserModel(client);
		const tagModel = new TagModel(client);
		const roleModel = new RoleModel(client);

		try {
			await client.query("BEGIN");

			const project = await projectModel.insert({
				description,
				name,
				ownerUserId,
				repoUrl
			});

			const ownerProjectRole = await projectRoleModel.insert({
				projectId: project.id,
				name: ownerRole
			});

			await projectUserModel.insert({
				projectId: project.id,
				projectRoleId: ownerProjectRole.id,
				userId: ownerUserId,
				isOwner: true
			});

			// Tags
			// eslint-disable-next-line no-restricted-syntax
			for (const tagName of tags) {
				const tag = await tagModel.findByName(tagName);

				await projectTagModel.insert({
					projectId: project.id,
					...(tag ? {tagId: tag.id} : {name: tagName})
				});
			}

			// Roles
			// eslint-disable-next-line no-restricted-syntax
			for (const [roleName, placesAvailable] of roles) {
				const role = await roleModel.findByName(roleName);

				await projectRoleModel.insert({
					projectId: project.id,
					placesAvailable,
					...(role ? {roleId: role.id} : {name: roleName})
				});
			}

			const populator = new ProjectPopulator(client);
			const populatedProject = await populator.populate(project);

			await client.query("COMMIT");

			return new ProjectDto(populatedProject);
		} catch (e) {
			await client.query("ROLLBACK");
			throw e;
		} finally {
			client.release();
		}
	}

	static async getAll(userId: string, opts: GetOptions): Promise<GetReturn> {
		const {search, limit, offset, searchTags} = opts;

		const client = await Db.getClient();
		const model = new ProjectModel(client);

		try {
			const [projects, totalCount] = await Promise.all([
				model.findAll({search, limit, offset, searchTags}),
				model.countAll({search, searchTags})
			]);

			const extendedProjects = await ProjectService.populateAndExtendMany(
				client,
				projects,
				userId
			);

			return {
				projects: extendedProjects.map(ep => new ExtendedProjectDto(ep)),
				totalCount
			};
		} finally {
			client.release();
		}
	}

	static async getByOwnerUserId(
		id: string,
		opts: GetOptions
	): Promise<GetReturn> {
		const {search, limit, offset} = opts;

		const client = await Db.getClient();
		const model = new ProjectModel(client);

		try {
			const [projects, totalCount] = await Promise.all([
				model.findByOwnerUserId(id, {search, limit, offset}),
				model.countByOwnerUserId(id, {search})
			]);

			return {
				projects: await ProjectService.populateAndExtendMany(
					client,
					projects,
					id
				),
				totalCount
			};
		} finally {
			client.release();
		}
	}

	static async getByMemberUserId(
		id: string,
		opts: GetOptions
	): Promise<GetReturn> {
		const {search, limit, offset} = opts;

		const client = await Db.getClient();
		const model = new ProjectModel(client);

		try {
			const [projects, totalCount] = await Promise.all([
				model.findByMemberUserId(id, {search, limit, offset}),
				model.countByMemberUserId(id, {search})
			]);

			return {
				projects: await ProjectService.populateAndExtendMany(
					client,
					projects,
					id
				),
				totalCount
			};
		} finally {
			client.release();
		}
	}

	private static async populateAndExtendMany(
		client: PoolClient,
		projects: ProjectDocument[],
		userId: string
	) {
		const populator = new ProjectPopulator(client);
		const populatedProjects = await populator.populateMany(projects);

		const extender = new ProjectExtender(client);
		return extender.extendMany(populatedProjects, userId);
	}

	static async deleteById(
		id: ProjectDocument["id"],
		userId: UserDocument["id"]
	): Promise<void> {
		const client = await Db.getClient();
		const projectModel = new ProjectModel(client);
		const userModel = new UserModel(client);

		try {
			const candidate = await projectModel.findById(id);
			if (!candidate) {
				throw ErrorFactory.getBadRequest(ApiErrorInfo.PROJECT_NOT_FOUND);
			}

			const isOwner = await userModel.isProjectOwner(id, userId);
			if (!isOwner) {
				throw ErrorFactory.getForbidden(
					ApiErrorInfo.PROJECT_OWNER_PERMISSION_REQUIRED
				);
			}

			await projectModel.deleteById(id);
		} finally {
			client.release();
		}
	}

	static async getById(
		id: ProjectDocument["id"],
		userId: UserDocument["id"]
	): Promise<ExtendedProjectDto> {
		const client = await Db.getClient();
		const model = new ProjectModel(client);

		try {
			const project = await model.findById(id);
			if (!project) {
				throw ErrorFactory.getBadRequest(ApiErrorInfo.PROJECT_NOT_FOUND);
			}

			const populator = new ProjectPopulator(client);
			const populatedProject = await populator.populate(project);

			const extender = new ProjectExtender(client);
			const extendedProject = await extender.extend(populatedProject, userId);

			return new ExtendedProjectDto(extendedProject);
		} finally {
			client.release();
		}
	}

	static async leaveById(
		id: ProjectDocument["id"],
		userId: UserDocument["id"]
	): Promise<void> {
		const client = await Db.getClient();
		const userModel = new UserModel(client);
		const projectUserModel = new ProjectUserModel(client);

		try {
			const isMember = await userModel.isProjectMember(id, userId);
			if (!isMember) {
				throw ErrorFactory.getForbidden(
					ApiErrorInfo.PROJECT_MEMBER_PERMISSION_REQUIRED
				);
			}

			await projectUserModel.deleteByProjectAndUserIds(id, userId);
		} finally {
			client.release();
		}
	}
}

export default ProjectService;
