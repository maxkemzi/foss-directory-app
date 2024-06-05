import {PopulateUtils} from "#src/db/documents";
import {ProjectMessageModel, UserModel} from "#src/db/models";
import {PopulatedProjectMessageDto} from "#src/dtos";
import {ApiError} from "#src/lib";
import {ProjectMessagePayload} from "#src/types/db/models";

class ProjectMessagesService {
	static async create({
		payload,
		projectId,
		userId
	}: {
		payload: ProjectMessagePayload;
		projectId: string;
		userId: string;
	}): Promise<PopulatedProjectMessageDto> {
		const hasProjectAccess = await UserModel.isProjectUser({
			projectId,
			userId
		});

		if (!hasProjectAccess) {
			throw new ApiError(403, "Forbidden.");
		}

		const message = await ProjectMessageModel.create(payload);
		const populatedMessage =
			await PopulateUtils.populateProjectMessage(message);
		return new PopulatedProjectMessageDto(populatedMessage);
	}

	static async getByProjectId({
		projectId,
		userId
	}: {
		projectId: string;
		userId: string;
	}) {
		const hasProjectAccess = await UserModel.isProjectUser({
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
		return populatedMessages.map(m => new PopulatedProjectMessageDto(m));
	}
}

export default ProjectMessagesService;
