import {
	ProjectRequestPayload,
	db,
	dbHelpers,
	projectRequestModel,
	projectUserModel,
	userModel
} from "#src/db";
import {ProjectRequestDto} from "#src/dtos";
import {ApiError} from "#src/lib";
import {GetByReceiverUserIdOptions, GetByReceiverUserIdReturn} from "./types";

const create = async (
	payload: ProjectRequestPayload,
	userId: string
): Promise<ProjectRequestDto> => {
	const client = await db.getClient();

	try {
		const isMember = await userModel.isProjectMember(client, {
			projectId: payload.projectId,
			userId
		});
		if (isMember) {
			throw new ApiError(403, "You are already the member of this project");
		}

		const request = await projectRequestModel.insert(client, payload);

		const populatedRequest = await request.populate(client);

		return new ProjectRequestDto(populatedRequest);
	} finally {
		client.release();
	}
};

const getByReceiverUserId = async (
	id: string,
	opts: GetByReceiverUserIdOptions = {}
): Promise<GetByReceiverUserIdReturn> => {
	const {limit, offset} = opts;

	const client = await db.getClient();

	try {
		const [requests, totalCount] = await Promise.all([
			projectRequestModel.findByReceiverUserId(client, id, {limit, offset}),
			projectRequestModel.countByReceiverUserId(client, id)
		]);

		const populatedRequests = await dbHelpers.populateMany(client, requests);

		return {
			requests: populatedRequests.map(pr => new ProjectRequestDto(pr)),
			totalCount
		};
	} finally {
		client.release();
	}
};

const acceptById = async (id: string, userId: string): Promise<void> => {
	const client = await db.getClient();

	try {
		const request = await projectRequestModel.findById(client, id);
		if (!request) {
			throw new ApiError(
				400,
				"Project request with the specified id was not found"
			);
		}

		const isReceiver = await userModel.isProjectRequestReceiver(client, {
			projectRequestId: id,
			userId
		});
		if (!isReceiver) {
			throw new ApiError(
				403,
				"Only the project request receiver can accept it"
			);
		}

		try {
			await client.query("BEGIN");

			await projectUserModel.insert(client, {
				userId: request.userId,
				projectId: request.projectId,
				projectRoleId: request.projectRoleId
			});

			await projectRequestModel.deleteById(client, id);

			await client.query("COMMIT");
		} catch (e) {
			await client.query("ROLLBACK");
			throw e;
		}
	} finally {
		client.release();
	}
};

const rejectById = async (id: string, userId: string): Promise<void> => {
	const client = await db.getClient();

	try {
		const request = await projectRequestModel.findById(client, id);
		if (!request) {
			throw new ApiError(
				400,
				"Project request with the specified id was not found"
			);
		}

		const isReceiver = await userModel.isProjectRequestReceiver(client, {
			projectRequestId: id,
			userId
		});
		if (!isReceiver) {
			throw new ApiError(
				403,
				"Only the project request receiver can reject it"
			);
		}

		await projectRequestModel.deleteById(client, id);
	} finally {
		client.release();
	}
};

export default {create, getByReceiverUserId, acceptById, rejectById};
