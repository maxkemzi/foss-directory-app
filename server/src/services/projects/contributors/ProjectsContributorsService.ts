import {PopulateUtils} from "#src/db/documents";
import {ProjectContributorModel, UserModel} from "#src/db/models";
import {PopulatedProjectContributorDto} from "#src/dtos";
import {ApiError} from "#src/lib";

class ProjectsContributorsService {
	static async getByProjectId({
		projectId,
		userId
	}: {
		projectId: string;
		userId: string;
	}) {
		const isContributor = await UserModel.isProjectContributor({
			projectId,
			userId
		});

		if (!isContributor) {
			throw new ApiError(403, "Forbidden.");
		}

		const contributors =
			await ProjectContributorModel.getByProjectId(projectId);

		const populatedContributors = await Promise.all(
			contributors.map(c => PopulateUtils.populateProjectContributor(c))
		);

		return populatedContributors.map(
			pc => new PopulatedProjectContributorDto(pc)
		);
	}

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
