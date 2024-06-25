import {
	Db,
	ProjectRequestModel,
	ProjectRequestPayload,
	ProjectRequestPopulator,
	ProjectUserModel,
	UserModel
} from "#src/db";
import {ApiError} from "#src/lib";
import {ProjectRequestDto} from "../dtos";
import {GetOptions, GetReturn} from "./types";

class ProjectRequestService {
	static async create(
		payload: ProjectRequestPayload,
		userId: string
	): Promise<ProjectRequestDto> {
		const client = await Db.getClient();
		const userModel = new UserModel(client);
		const requestModel = new ProjectRequestModel(client);

		try {
			const isMember = await userModel.isProjectMember(
				payload.projectId,
				userId
			);
			if (isMember) {
				throw new ApiError(403, "You are already the member of this project");
			}

			const request = await requestModel.insert(payload);

			const populator = new ProjectRequestPopulator(client);
			const populatedRequest = await populator.populate(request);

			return new ProjectRequestDto(populatedRequest);
		} finally {
			client.release();
		}
	}

	static async getByReceiverUserId(
		id: string,
		opts: GetOptions = {}
	): Promise<GetReturn> {
		const {limit, offset} = opts;

		const client = await Db.getClient();
		const model = new ProjectRequestModel(client);

		try {
			const [requests, totalCount] = await Promise.all([
				model.findByReceiverUserId(id, {limit, offset}),
				model.countByReceiverUserId(id)
			]);

			const populator = new ProjectRequestPopulator(client);
			const populatedRequests = await populator.populateMany(requests);

			return {
				requests: populatedRequests.map(pr => new ProjectRequestDto(pr)),
				totalCount
			};
		} finally {
			client.release();
		}
	}

	static async acceptById(id: string, userId: string): Promise<void> {
		const client = await Db.getClient();
		const userModel = new UserModel(client);
		const requestModel = new ProjectRequestModel(client);
		const projectUserModel = new ProjectUserModel(client);

		try {
			const request = await requestModel.findById(id);
			if (!request) {
				throw new ApiError(
					400,
					"Project request with the specified id was not found"
				);
			}

			const isReceiver = await userModel.isProjectRequestReceiver(id, userId);
			if (!isReceiver) {
				throw new ApiError(
					403,
					"Only the project request receiver can accept it"
				);
			}

			try {
				await client.query("BEGIN");

				await projectUserModel.insert({
					userId: request.userId,
					projectId: request.projectId,
					projectRoleId: request.projectRoleId
				});

				await requestModel.deleteById(id);

				await client.query("COMMIT");
			} catch (e) {
				await client.query("ROLLBACK");
				throw e;
			}
		} finally {
			client.release();
		}
	}

	static async rejectById(id: string, userId: string): Promise<void> {
		const client = await Db.getClient();
		const userModel = new UserModel(client);
		const requestModel = new ProjectRequestModel(client);

		try {
			const request = await requestModel.findById(id);
			if (!request) {
				throw new ApiError(
					400,
					"Project request with the specified id was not found"
				);
			}

			const isReceiver = await userModel.isProjectRequestReceiver(id, userId);
			if (!isReceiver) {
				throw new ApiError(
					403,
					"Only the project request receiver can reject it"
				);
			}

			await requestModel.deleteById(id);
		} finally {
			client.release();
		}
	}
}

export default ProjectRequestService;
