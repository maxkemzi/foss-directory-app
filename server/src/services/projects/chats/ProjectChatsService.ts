import {PopulateUtils} from "#src/db/documents";
import {ProjectMessageModel, ProjectModel, UserModel} from "#src/db/models";
import {ProjectChatMessageDto, ProjectChatDto} from "#src/dtos";
import {ApiError} from "#src/lib";

class ProjectChatsService {
	static async getByUserId(userId: string): Promise<ProjectChatDto[]> {
		const projects = await ProjectModel.getByUserId(userId);
		const populatedProjects = await Promise.all(
			projects.map(p => PopulateUtils.populateProject(p, userId))
		);

		return populatedProjects.map(pp => new ProjectChatDto(pp));
	}

	static async getByProjectId({
		projectId,
		userId
	}: {
		projectId: string;
		userId: string;
	}): Promise<ProjectChatDto> {
		const hasProjectAccess = await UserModel.hasProjectAccess({
			projectId,
			userId
		});
		if (!hasProjectAccess) {
			throw new ApiError(403, "Forbidden");
		}

		const project = await ProjectModel.getById(projectId);
		if (!project) {
			throw new ApiError(400, "No project by the specified id was found.");
		}

		const populatedProject = await PopulateUtils.populateProject(project);
		return new ProjectChatDto(populatedProject);
	}

	static async getMessagesByProjectId({
		projectId,
		userId
	}: {
		projectId: string;
		userId: string;
	}) {
		const hasProjectAccess = await UserModel.hasProjectAccess({
			projectId,
			userId
		});

		if (!hasProjectAccess) {
			throw new ApiError(403, "Forbidden.");
		}

		const messages = await ProjectMessageModel.getByProjectId(projectId);
		const populatedMessages = await Promise.all(
			messages.map(m => PopulateUtils.populateProjectMessage(m))
		);
		return populatedMessages.map(m => new ProjectChatMessageDto(m));
	}
}

export default ProjectChatsService;
