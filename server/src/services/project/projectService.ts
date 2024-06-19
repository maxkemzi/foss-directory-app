/* eslint-disable no-await-in-loop */
import {
	PopulatedProjectDocument,
	db,
	dbHelpers,
	projectModel,
	projectRoleModel,
	projectTagModel,
	projectUserModel,
	roleModel,
	tagModel,
	userModel
} from "#src/db";
import {ExtendedProjectDto, ProjectDto} from "#src/dtos";
import {ApiError} from "#src/lib";
import {PoolClient} from "pg";
import {
	CreateProjectPayload,
	ExtendedProject,
	GetAllOptions,
	GetAllReturn,
	GetByMemberUserIdOptions,
	GetByMemberUserIdReturn,
	GetByOwnerUserIdOptions,
	GetByOwnerUserIdReturn
} from "./types";

const extend = async (
	client: PoolClient,
	project: PopulatedProjectDocument,
	userId: string
): Promise<ExtendedProject> => {
	const [memberCount, isOwner, isMember] = await Promise.all([
		projectUserModel.countByProjectId(client, project.id),
		userModel.isProjectOwner(client, {
			projectId: project.id,
			userId
		}),
		userModel.isProjectMember(client, {
			projectId: project.id,
			userId
		})
	]);

	return {...project, memberCount, isRequestable: !isOwner && !isMember};
};

const create = async ({
	description,
	name,
	ownerUserId,
	repoUrl,
	role: ownerRole,
	roles,
	tags
}: CreateProjectPayload): Promise<ProjectDto> => {
	const client = await db.getClient();

	try {
		await client.query("BEGIN");

		const project = await projectModel.insert(client, {
			description,
			name,
			ownerUserId,
			repoUrl
		});

		const ownerProjectRole = await projectRoleModel.insert(client, {
			projectId: project.id,
			name: ownerRole
		});

		await projectUserModel.insert(client, {
			projectId: project.id,
			projectRoleId: ownerProjectRole.id,
			userId: ownerUserId,
			isOwner: true
		});

		// Tags
		// eslint-disable-next-line no-restricted-syntax
		for (const tagName of tags) {
			const tag = await tagModel.findByName(client, tagName);

			await projectTagModel.insert(client, {
				projectId: project.id,
				...(tag ? {tagId: tag.id} : {name: tagName})
			});
		}

		// Roles
		// eslint-disable-next-line no-restricted-syntax
		for (const [roleName, placesAvailable] of Object.entries(roles)) {
			const role = await roleModel.findByName(client, roleName);

			await projectRoleModel.insert(client, {
				projectId: project.id,
				placesAvailable,
				...(role ? {roleId: role.id} : {name: roleName})
			});
		}

		await client.query("COMMIT");

		const populatedProject = await project.populate(client);

		return new ProjectDto(populatedProject);
	} catch (e) {
		await client.query("ROLLBACK");
		throw e;
	} finally {
		client.release();
	}
};

const getAll = async (
	userId: string,
	opts: GetAllOptions
): Promise<GetAllReturn> => {
	const {search, limit, offset} = opts;

	const client = await db.getClient();

	try {
		const [projects, totalCount] = await Promise.all([
			projectModel.findAll(client, {search, limit, offset}),
			projectModel.countAll(client, {search})
		]);

		const populatedProjects = await dbHelpers.populateMany(client, projects);

		const extendedProjects = await Promise.all(
			populatedProjects.map(pp => extend(client, pp, userId))
		);

		return {
			projects: extendedProjects.map(ep => new ExtendedProjectDto(ep)),
			totalCount
		};
	} finally {
		client.release();
	}
};

const getByOwnerUserId = async (
	id: string,
	opts: GetByOwnerUserIdOptions
): Promise<GetByOwnerUserIdReturn> => {
	const {search, limit, offset} = opts;

	const client = await db.getClient();

	try {
		const [projects, totalCount] = await Promise.all([
			projectModel.findByOwnerUserId(client, id, {search, limit, offset}),
			projectModel.countByOwnerUserId(client, id, {search})
		]);

		const populatedProjects = await dbHelpers.populateMany(client, projects);

		const extendedProjects = await Promise.all(
			populatedProjects.map(pp => extend(client, pp, id))
		);

		return {
			projects: extendedProjects.map(ep => new ExtendedProjectDto(ep)),
			totalCount
		};
	} finally {
		client.release();
	}
};

const getByMemberUserId = async (
	id: string,
	opts: GetByMemberUserIdOptions
): Promise<GetByMemberUserIdReturn> => {
	const {search, limit, offset} = opts;

	const client = await db.getClient();

	try {
		const [projects, totalCount] = await Promise.all([
			projectModel.findByMemberUserId(client, id, {search, limit, offset}),
			projectModel.countByMemberUserId(client, id, {search})
		]);

		const populatedProjects = await dbHelpers.populateMany(client, projects);

		const extendedProjects = await Promise.all(
			populatedProjects.map(pp => extend(client, pp, id))
		);

		return {
			projects: extendedProjects.map(ep => new ExtendedProjectDto(ep)),
			totalCount
		};
	} finally {
		client.release();
	}
};

const deleteById = async (id: string, userId: string) => {
	const client = await db.getClient();

	try {
		const candidate = await projectModel.findById(client, id);
		if (!candidate) {
			throw new ApiError(400, "Project by the specified id was not found");
		}

		const isOwner = await userModel.isProjectOwner(client, {
			projectId: id,
			userId
		});
		if (!isOwner) {
			throw new ApiError(403, "You are not the owner of this project");
		}

		await projectModel.deleteById(client, id);
	} finally {
		client.release();
	}
};

const getById = async (
	id: string,
	userId: string
): Promise<ExtendedProjectDto> => {
	const client = await db.getClient();

	try {
		const project = await projectModel.findById(client, id);
		if (!project) {
			throw new ApiError(400, "Project by the specified id was not found");
		}

		const populatedProject = await project.populate(client);

		const extendedProject = await extend(client, populatedProject, userId);

		return new ExtendedProjectDto(extendedProject);
	} finally {
		client.release();
	}
};

const leaveById = async (id: string, userId: string) => {
	const client = await db.getClient();

	try {
		const isMember = await userModel.isProjectMember(client, {
			projectId: id,
			userId
		});
		if (!isMember) {
			throw new ApiError(403, "You are not the member of this project");
		}

		await projectUserModel.deleteByProjectAndUserIds(client, {
			projectId: id,
			userId
		});
	} finally {
		client.release();
	}
};

export default {
	create,
	deleteById,
	getByOwnerUserId,
	getByMemberUserId,
	getById,
	getAll,
	leaveById
};
