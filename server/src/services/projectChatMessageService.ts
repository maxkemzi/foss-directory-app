import {
	ProjectMessagePayload,
	db,
	dbHelpers,
	projectMessageModel,
	userModel
} from "#src/db";
import {ProjectChatMessageDto} from "#src/dtos";
import {ApiError} from "#src/lib";

const create = async (
	payload: ProjectMessagePayload,
	userId: string
): Promise<ProjectChatMessageDto> => {
	const client = await db.getClient();

	try {
		const isProjectMember = await userModel.isProjectMember(client, {
			projectId: payload.projectId,
			userId
		});
		if (!isProjectMember) {
			throw new ApiError(403, "You are not the member of this project");
		}

		const message = await projectMessageModel.insert(client, payload);

		const populatedMessage = await message.populate(client);

		return new ProjectChatMessageDto(populatedMessage);
	} finally {
		client.release();
	}
};

const getByProjectId = async (
	id: string,
	userId: string
): Promise<ProjectChatMessageDto[]> => {
	const client = await db.getClient();

	try {
		const isProjectMember = await userModel.isProjectMember(client, {
			projectId: id,
			userId
		});
		if (!isProjectMember) {
			throw new ApiError(403, "You are not the member of this project");
		}

		const messages = await projectMessageModel.findByProjectId(client, id);

		const populatedMessages = await dbHelpers.populateMany(client, messages);

		return populatedMessages.map(m => new ProjectChatMessageDto(m));
	} finally {
		client.release();
	}
};

export default {create, getByProjectId};
