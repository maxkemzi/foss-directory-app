import {PopulateUtils} from "#src/db/documents";
import {ProjectRequestModel, UserModel} from "#src/db/models";
import {PopulatedProjectRequestDto} from "#src/dtos";
import {ApiError} from "#src/lib";

class ProjectRequestsService {
	static async request({
		userId,
		projectId,
		projectRoleId
	}: {
		userId: string;
		projectId: string;
		projectRoleId: string;
	}): Promise<void> {
		const hasProjectAccess = await UserModel.isProjectUser({
			projectId,
			userId
		});

		if (hasProjectAccess) {
			throw new ApiError(403, "Forbidden.");
		}

		await ProjectRequestModel.create({userId, projectId, projectRoleId});
	}

	static async getAll(userId: string): Promise<PopulatedProjectRequestDto[]> {
		const requests = await ProjectRequestModel.getAllByRequestedId(userId);
		const populatedRequests = await Promise.all(
			requests.map(r => PopulateUtils.populateProjectRequest(r))
		);
		return populatedRequests.map(pr => new PopulatedProjectRequestDto(pr));
	}

	static async accept({
		projectRequestId,
		userId
	}: {
		projectRequestId: string;
		userId: string;
	}): Promise<void> {
		const hasAccess = await UserModel.hasProjectRequestAccess({
			projectRequestId,
			userId
		});

		if (!hasAccess) {
			throw new ApiError(403, "Forbidden.");
		}

		await ProjectRequestModel.accept(projectRequestId);
	}

	static async reject({
		projectRequestId,
		userId
	}: {
		projectRequestId: string;
		userId: string;
	}): Promise<void> {
		const hasAccess = await UserModel.hasProjectRequestAccess({
			projectRequestId,
			userId
		});

		if (!hasAccess) {
			throw new ApiError(403, "Forbidden.");
		}

		await ProjectRequestModel.reject(projectRequestId);
	}
}

export default ProjectRequestsService;
