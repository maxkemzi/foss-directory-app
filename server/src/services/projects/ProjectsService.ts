import {ProjectModel} from "#src/db/models";

class ProjectsService {
	static async getAll() {
		const projects = await ProjectModel.find();
		return projects;
	}
}

export default ProjectsService;
