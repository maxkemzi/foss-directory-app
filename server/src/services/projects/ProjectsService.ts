/* eslint-disable no-await-in-loop */
import {PopulateUtils} from "#src/db/documents";
import {ProjectModel} from "#src/db/models";
import {PopulatedProjectDto} from "#src/dtos";
import {ProjectPayload, PaginationArgs} from "#src/types/db/models";

class ProjectsService {
	static async create(payload: ProjectPayload): Promise<PopulatedProjectDto> {
		const project = await ProjectModel.create(payload);
		const populatedProject = await PopulateUtils.populateProject(project);

		return new PopulatedProjectDto(populatedProject);
	}

	static async getAll(
		args: PaginationArgs
	): Promise<{projects: PopulatedProjectDto[]; totalCount: number}> {
		const {projects, totalCount} = await ProjectModel.getAll(args);
		const populatedProjects = await Promise.all(
			projects.map(p => PopulateUtils.populateProject(p))
		);

		return {
			projects: populatedProjects.map(pp => new PopulatedProjectDto(pp)),
			totalCount
		};
	}

	static async getAllByUserId(id: number): Promise<PopulatedProjectDto[]> {
		const projects = await ProjectModel.getAllByUserId(id);
		const populatedProjects = await Promise.all(
			projects.map(p => PopulateUtils.populateProject(p))
		);

		return populatedProjects.map(pp => new PopulatedProjectDto(pp));
	}

	static async deleteById(id: number) {
		await ProjectModel.deleteById(id);
	}
}

export default ProjectsService;
