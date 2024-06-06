import {Header} from "#src/constants";
import {ProjectsService} from "#src/services";
import {PaginationQueryParams} from "#src/types/controllers";
import {NextFunction, Request, Response} from "express";

class ProjectsController {
	static async create(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = res.locals.user?.id!;
			const {name, description, tags, roles, repoUrl, role} = req.body;

			const project = await ProjectsService.create({
				name,
				description,
				tags,
				roles,
				repoUrl,
				role,
				ownerUserId: userId
			});

			res.status(201).json(project);
		} catch (e) {
			next(e);
		}
	}

	static async getAll(
		req: Request<{}, {}, {}, PaginationQueryParams>,
		res: Response,
		next: NextFunction
	) {
		try {
			const {search, limit, page} = req.query;
			const userId = res.locals.user?.id!;

			const parsedLimit = limit ? parseInt(limit, 10) : 10;
			const parsedPage = page ? parseInt(page, 10) : 1;

			const offset = (parsedPage - 1) * parsedLimit;

			const {projects, totalCount} = await ProjectsService.getAll({
				search,
				limit: parsedLimit,
				offset,
				userId
			});

			res.set({[Header.TOTAL_COUNT]: totalCount});
			res.json(projects);
		} catch (e) {
			next(e);
		}
	}

	static async getAllAuth(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = res.locals.user?.id!;

			const projects = await ProjectsService.getAllByUserId(userId);

			res.json(projects);
		} catch (e) {
			next(e);
		}
	}

	static async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const {id} = req.params;
			const userId = res.locals.user?.id!;

			await ProjectsService.deleteById({projectId: id, userId});

			res.json({success: true});
		} catch (e) {
			next(e);
		}
	}

	static async getById(req: Request, res: Response, next: NextFunction) {
		try {
			const {id} = req.params;
			const userId = res.locals.user?.id!;

			const project = await ProjectsService.getById({projectId: id, userId});

			res.json(project);
		} catch (e) {
			next(e);
		}
	}
}

export default ProjectsController;
