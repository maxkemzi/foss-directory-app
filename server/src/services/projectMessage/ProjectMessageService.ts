import {
	Db,
	ProjectMessageModel,
	ProjectMessagePayload,
	ProjectMessagePopulator,
	UserModel
} from "#src/db";
import {ApiError} from "#src/lib";
import {ProjectMessageDto} from "../dtos";
import {GetOptions, GetReturn, OmitFromUnion} from "./types";

class ProjectMessageService {
	static async create(
		payload: OmitFromUnion<ProjectMessagePayload, "isSequential">,
		userId: string
	): Promise<ProjectMessageDto> {
		const client = await Db.getClient();
		const userModel = new UserModel(client);
		const messageModel = new ProjectMessageModel(client);

		try {
			const isProjectMember = await userModel.isProjectMember(
				payload.projectId,
				userId
			);
			if (!isProjectMember) {
				throw new ApiError(403, "You are not the member of this project");
			}

			const latestMessage = await messageModel.findLatestByProjectId(
				payload.projectId
			);

			const isSequential = latestMessage
				? latestMessage.type === "regular" && latestMessage.userId === userId
				: false;

			const message = await messageModel.insert({...payload, isSequential});

			const populator = new ProjectMessagePopulator(client);
			const populatedMessage = await populator.populate(message);

			return new ProjectMessageDto(populatedMessage);
		} finally {
			client.release();
		}
	}

	static async getByProjectId(
		id: string,
		userId: string,
		opts: GetOptions
	): Promise<GetReturn> {
		const {limit, offset} = opts;

		const client = await Db.getClient();
		const userModel = new UserModel(client);
		const messageModel = new ProjectMessageModel(client);

		try {
			const isProjectMember = await userModel.isProjectMember(id, userId);
			if (!isProjectMember) {
				throw new ApiError(403, "You are not the member of this project");
			}

			const [messages, totalCount] = await Promise.all([
				messageModel.findByProjectId(id, {limit, offset}),
				messageModel.countByProjectId(id)
			]);

			const populator = new ProjectMessagePopulator(client);
			const populatedMessages = await populator.populateMany(messages);

			return {
				messages: populatedMessages.map(m => new ProjectMessageDto(m)),
				totalCount
			};
		} finally {
			client.release();
		}
	}
}

export default ProjectMessageService;
