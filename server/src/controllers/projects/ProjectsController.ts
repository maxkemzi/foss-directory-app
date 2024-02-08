import {ApiError} from "#src/lib";
import {ProjectsService} from "#src/services";
import {Request, Response, NextFunction} from "express";

class ProjectsController {
	static async create(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = res.locals.user?.id!;
			const {name, description, tags, repoUrl} = req.body;

			const project = await ProjectsService.create({
				name,
				description,
				tags,
				repoUrl,
				ownerId: userId
			});

			res.status(201).json(project);
		} catch (e) {
			next(e);
		}
	}

	static async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const projects = await ProjectsService.getAll();

			res.json(projects);
		} catch (e) {
			next(e);
		}
	}

	static async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const {id} = req.params;
			if (!id) {
				throw new ApiError(400, "Project id is not provided.");
			}

			await ProjectsService.deleteById(Number(id));

			res.json({success: true});
		} catch (e) {
			next(e);
		}
	}
}

export default ProjectsController;
