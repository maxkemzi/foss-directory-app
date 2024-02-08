/* eslint-disable no-await-in-loop */
import {ProjectModel, ProjectPayload} from "#src/db/models";
import {PopulatedProjectDto} from "#src/dtos";

class ProjectsService {
	static async create(payload: ProjectPayload): Promise<PopulatedProjectDto> {
		const project = await ProjectModel.create(payload);
		const populatedProject = await project.populate();

		return new PopulatedProjectDto(populatedProject);
	}

	static async getAll(): Promise<PopulatedProjectDto[]> {
		const projects = await ProjectModel.getAll();
		const populatedProjects = await Promise.all(
			projects.map(p => p.populate())
		);

		return populatedProjects.map(pp => new PopulatedProjectDto(pp));
	}

	static async deleteById(id: number) {
		await ProjectModel.deleteById(id);
	}
}

export default ProjectsService;
