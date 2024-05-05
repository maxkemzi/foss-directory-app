import {ProjectRequestsService} from "#src/services";
import {NextFunction, Request, Response} from "express";

class ProjectRequestsController {
	static async request(req: Request, res: Response, next: NextFunction) {
		try {
			const {projectRoleId} = req.body;
			const userId = res.locals.user?.id!;

			await ProjectRequestsService.request({
				requestorId: userId,
				projectRoleId
			});

			res.json({success: true});
		} catch (e) {
			next(e);
		}
	}

	static async getAllRequests(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = res.locals.user?.id!;

			const requests = await ProjectRequestsService.getAllRequests(userId);

			res.json(requests);
		} catch (e) {
			next(e);
		}
	}

	static async accept(req: Request, res: Response, next: NextFunction) {
		try {
			const {id} = req.params;

			await ProjectRequestsService.accept(Number(id));

			res.json({success: true});
		} catch (e) {
			next(e);
		}
	}

	static async reject(req: Request, res: Response, next: NextFunction) {
		try {
			const {id} = req.params;

			await ProjectRequestsService.reject(Number(id));

			res.json({success: true});
		} catch (e) {
			next(e);
		}
	}
}

export default ProjectRequestsController;
