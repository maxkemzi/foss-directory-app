import {
	db,
	dbHelpers,
	projectModel,
	projectUserModel,
	userModel
} from "#src/db";
import {ProjectChatDto} from "#src/dtos";
import {ApiError} from "#src/lib";

const getByMemberUserId = async (id: string): Promise<ProjectChatDto[]> => {
	const client = await db.getClient();

	try {
		const projects = await projectModel.findByMemberUserId(client, id);

		const populatedProjects = await dbHelpers.populateMany(client, projects);

		const projectChats = await Promise.all(
			populatedProjects.map(async pp => ({
				...pp,
				memberCount: await projectUserModel.countByProjectId(client, pp.id)
			}))
		);

		return projectChats.map(pc => new ProjectChatDto(pc));
	} finally {
		client.release();
	}
};

const getByProjectId = async (
	id: string,
	userId: string
): Promise<ProjectChatDto> => {
	const client = await db.getClient();

	try {
		const project = await projectModel.findById(client, id);
		if (!project) {
			throw new ApiError(400, "Project with the specified id was not found");
		}

		const isProjectMember = await userModel.isProjectMember(client, {
			projectId: id,
			userId
		});
		if (!isProjectMember) {
			throw new ApiError(403, "You are not the member of this project");
		}

		const populatedProject = await project.populate(client);

		const memberCount = await projectUserModel.countByProjectId(client, id);

		const projectChat = {...populatedProject, memberCount};

		return new ProjectChatDto(projectChat);
	} finally {
		client.release();
	}
};

export default {getByProjectId, getByMemberUserId};
