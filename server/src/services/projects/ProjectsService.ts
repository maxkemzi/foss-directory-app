/* eslint-disable no-await-in-loop */
import {PopulateUtils} from "#src/db/documents";
import {ProjectModel, UserModel} from "#src/db/models";
import {PopulatedProjectDto} from "#src/dtos";
import {ApiError} from "#src/lib";
import {ProjectPayload, PaginationArgs} from "#src/types/db/models";

class ProjectsService {
	static async create(payload: ProjectPayload): Promise<PopulatedProjectDto> {
		const project = await ProjectModel.create(payload);
		const populatedProject = await PopulateUtils.populateProject(project);

		return new PopulatedProjectDto(populatedProject);
	}

	static async getAll({
		userId,
		...args
	}: PaginationArgs & {userId: string}): Promise<{
		projects: PopulatedProjectDto[];
		totalCount: number;
	}> {
		const {projects, totalCount} = await ProjectModel.getAll(args);
		const populatedProjects = await Promise.all(
			projects.map(p => PopulateUtils.populateProject(p, userId))
		);

		return {
			projects: populatedProjects.map(pp => new PopulatedProjectDto(pp)),
			totalCount
		};
	}

	static async getAllByUserId(id: string): Promise<PopulatedProjectDto[]> {
		const projects = await ProjectModel.getAllByUserId(id);
		const populatedProjects = await Promise.all(
			projects.map(p => PopulateUtils.populateProject(p, id))
		);

		return populatedProjects.map(pp => new PopulatedProjectDto(pp));
	}

	static async getContributed(userId: string): Promise<PopulatedProjectDto[]> {
		const projects = await ProjectModel.getContributed(userId);
		const populatedProjects = await Promise.all(
			projects.map(p => PopulateUtils.populateProject(p, userId))
		);

		return populatedProjects.map(pp => new PopulatedProjectDto(pp));
	}

	static async deleteById({
		projectId,
		userId
	}: {
		projectId: string;
		userId: string;
	}) {
		const isOwner = await UserModel.isProjectOwner({projectId, userId});

		if (!isOwner) {
			throw new ApiError(403, "Forbidden");
		}

		await ProjectModel.deleteById(projectId);
	}

	static async getById({
		projectId,
		userId
	}: {
		projectId: string;
		userId: string;
	}): Promise<PopulatedProjectDto> {
		const hasProjectAccess = await UserModel.isProjectUser({
			projectId,
			userId
		});
		if (!hasProjectAccess) {
			throw new ApiError(403, "Forbidden");
		}

		const project = await ProjectModel.getById(projectId);
		if (!project) {
			throw new ApiError(
				400,
				`No project by the id of ${projectId} was found.`
			);
		}

		const populatedProject = await PopulateUtils.populateProject(
			project,
			userId
		);

		return new PopulatedProjectDto(populatedProject);
	}
}

export default ProjectsService;
