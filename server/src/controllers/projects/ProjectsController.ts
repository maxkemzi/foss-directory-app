import {ProjectsService} from "#src/services";
import {Request, Response, NextFunction} from "express";

class ProjectsController {
	static async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const projects = await ProjectsService.getAll();

			res.json(projects);
		} catch (e) {
			next(e);
		}
	}
}

export default ProjectsController;
