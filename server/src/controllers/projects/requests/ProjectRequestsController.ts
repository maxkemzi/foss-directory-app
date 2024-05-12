import {ProjectRequestsService} from "#src/services";
import {NextFunction, Request, Response} from "express";

class ProjectRequestsController {
	static async request(req: Request, res: Response, next: NextFunction) {
		try {
			const {projectId, projectRoleId} = req.body;
			const userId = res.locals.user?.id!;

			await ProjectRequestsService.request({
				userId,
				projectId,
				projectRoleId
			});

			res.json({success: true});
		} catch (e) {
			next(e);
		}
	}

	static async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = res.locals.user?.id!;

			const requests = await ProjectRequestsService.getAll(userId);

			res.json(requests);
		} catch (e) {
			next(e);
		}
	}

	static async accept(req: Request, res: Response, next: NextFunction) {
		try {
			const {id} = req.params;
			const userId = res.locals.user?.id!;

			await ProjectRequestsService.accept({projectRequestId: id, userId});

			res.json({success: true});
		} catch (e) {
			next(e);
		}
	}

	static async reject(req: Request, res: Response, next: NextFunction) {
		try {
			const {id} = req.params;
			const userId = res.locals.user?.id!;

			await ProjectRequestsService.reject({projectRequestId: id, userId});

			res.json({success: true});
		} catch (e) {
			next(e);
		}
	}
}

export default ProjectRequestsController;
