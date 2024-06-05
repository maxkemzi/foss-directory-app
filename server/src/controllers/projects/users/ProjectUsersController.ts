import {ProjectUsersService} from "#src/services";
import {NextFunction, Request, Response} from "express";

class ProjectUsersController {
	static async getByProjectId(req: Request, res: Response, next: NextFunction) {
		try {
			const {projectId} = req.params;
			const userId = res.locals.user?.id!;

			const users = await ProjectUsersService.getByProjectId({
				projectId,
				userId
			});

			res.json(users);
		} catch (e) {
			next(e);
		}
	}

	static async leave(req: Request, res: Response, next: NextFunction) {
		try {
			const {projectId} = req.params;
			const userId = res.locals.user?.id!;

			await ProjectUsersService.leave({projectId, userId});

			res.json({success: true});
		} catch (e) {
			next(e);
		}
	}
}

export default ProjectUsersController;
