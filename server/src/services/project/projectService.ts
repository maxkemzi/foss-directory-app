/* eslint-disable no-await-in-loop */
import {
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
import {ProjectDto, ProjectWithDetailsDto} from "#src/dtos";
import {ApiError} from "#src/lib";
import {PoolClient} from "pg";
import {
	CreateProjectPayload,
	GetAllOptions,
	GetAllReturn,
	GetByMemberUserIdOptions,
	GetByMemberUserIdReturn,
	GetByOwnerUserIdOptions,
	GetByOwnerUserIdReturn
} from "./types";

const getDetailsById = async (
	client: PoolClient,
	id: string,
	userId: string
) => {
	const [memberCount, isOwner, isMember] = await Promise.all([
		projectUserModel.countByProjectId(client, id),
		userModel.isProjectOwner(client, {
			projectId: id,
			userId
		}),
		userModel.isProjectMember(client, {
			projectId: id,
			userId
		})
	]);

	return {memberCount, isOwner, isMember};
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

		const projectsWithDetails = await Promise.all(
			populatedProjects.map(async pp => ({
				...pp,
				...(await getDetailsById(client, pp.id, userId))
			}))
		);

		return {
			projects: projectsWithDetails.map(pwd => new ProjectWithDetailsDto(pwd)),
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

		const projectsWithDetails = await Promise.all(
			populatedProjects.map(async pp => ({
				...pp,
				...(await getDetailsById(client, pp.id, id))
			}))
		);

		return {
			projects: projectsWithDetails.map(pwd => new ProjectWithDetailsDto(pwd)),
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

		const projectsWithDetails = await Promise.all(
			populatedProjects.map(async pp => ({
				...pp,
				...(await getDetailsById(client, pp.id, id))
			}))
		);

		return {
			projects: projectsWithDetails.map(pwd => new ProjectWithDetailsDto(pwd)),
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
): Promise<ProjectWithDetailsDto> => {
	const client = await db.getClient();

	try {
		const project = await projectModel.findById(client, id);
		if (!project) {
			throw new ApiError(400, "Project by the specified id was not found");
		}

		const populatedProject = await project.populate(client);

		const details = await getDetailsById(client, id, userId);

		const projectWithDetails = {...populatedProject, ...details};

		return new ProjectWithDetailsDto(projectWithDetails);
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
