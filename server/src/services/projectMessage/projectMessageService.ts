import {
	ProjectMessagePayload,
	db,
	dbHelpers,
	projectMessageModel,
	userModel
} from "#src/db";
import {ProjectMessageDto} from "#src/dtos";
import {ApiError} from "#src/lib";
import {GetByProjectIdOptions, GetByProjectIdReturn} from "./types";

const create = async (
	payload: ProjectMessagePayload,
	userId: string
): Promise<ProjectMessageDto> => {
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

		return new ProjectMessageDto(populatedMessage);
	} finally {
		client.release();
	}
};

const getByProjectId = async (
	id: string,
	userId: string,
	opts: GetByProjectIdOptions
): Promise<GetByProjectIdReturn> => {
	const {limit, offset} = opts;

	const client = await db.getClient();

	try {
		const isProjectMember = await userModel.isProjectMember(client, {
			projectId: id,
			userId
		});
		if (!isProjectMember) {
			throw new ApiError(403, "You are not the member of this project");
		}

		const [messages, totalCount] = await Promise.all([
			projectMessageModel.findByProjectId(client, id, {limit, offset}),
			projectMessageModel.countByProjectId(client, id)
		]);

		const populatedMessages = await dbHelpers.populateMany(client, messages);

		return {
			messages: populatedMessages.map(m => new ProjectMessageDto(m)),
			totalCount
		};
	} finally {
		client.release();
	}
};

export default {create, getByProjectId};