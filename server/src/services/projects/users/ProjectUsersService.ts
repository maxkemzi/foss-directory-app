import {PopulateUtils} from "#src/db/documents";
import {ProjectUserModel, UserModel} from "#src/db/models";
import {PopulatedProjectUserDto} from "#src/dtos";
import {ApiError} from "#src/lib";

class ProjectUsersService {
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

		const users = await ProjectUserModel.getByProjectId(projectId);

		const populatedUsers = await Promise.all(
			users.map(u => PopulateUtils.populateProjectUser(u))
		);

		return populatedUsers.map(pu => new PopulatedProjectUserDto(pu));
	}

	static async leave({projectId, userId}: {projectId: string; userId: string}) {
		const hasProjectAccess = await UserModel.hasProjectAccess({
			projectId,
			userId
		});

		if (!hasProjectAccess) {
			throw new ApiError(403, "Forbidden.");
		}

		await ProjectUserModel.delete({projectId, userId});
	}
}

export default ProjectUsersService;
