import {ProjectContributorModel, UserModel} from "#src/db/models";
import {ApiError} from "#src/lib";

class ProjectsContributorsService {
	static async leave({projectId, userId}: {projectId: string; userId: string}) {
		const isContributor = await UserModel.isProjectContributor({
			projectId,
			userId
		});

		if (!isContributor) {
			throw new ApiError(403, "Forbidden.");
		}

		await ProjectContributorModel.delete({projectId, userId});
	}
}

export default ProjectsContributorsService;
