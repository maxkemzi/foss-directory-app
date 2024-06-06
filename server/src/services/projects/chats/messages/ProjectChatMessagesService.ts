import {PopulateUtils} from "#src/db/documents";
import {ProjectMessageModel, UserModel} from "#src/db/models";
import {ProjectChatMessageDto} from "#src/dtos";
import {ApiError} from "#src/lib";

class ProjectChatMessagesService {
	static async getByProjectId({
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

export default ProjectChatMessagesService;
