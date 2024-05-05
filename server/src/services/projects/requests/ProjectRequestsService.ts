import {PopulateUtils} from "#src/db/documents";
import {ProjectRequestModel} from "#src/db/models";
import {PopulatedProjectRequestDto} from "#src/dtos";

class ProjectRequestsService {
	static async request({
		requestorId,
		projectRoleId
	}: {
		requestorId: number;
		projectRoleId: number;
	}): Promise<void> {
		await ProjectRequestModel.create({
			requestorId,
			projectRoleId
		});
	}

	static async getAllRequests(
		userId: number
	): Promise<PopulatedProjectRequestDto[]> {
		const requests = await ProjectRequestModel.getAllByRequestedId(userId);
		const populatedRequests = await Promise.all(
			requests.map(r => PopulateUtils.populateProjectRoleRequest(r))
		);
		return populatedRequests.map(pr => new PopulatedProjectRequestDto(pr));
	}

	static async accept(id: number): Promise<void> {
		await ProjectRequestModel.accept(id);
	}

	static async reject(id: number): Promise<void> {
		await ProjectRequestModel.reject(id);
	}
}

export default ProjectRequestsService;
