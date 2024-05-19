import {ProjectsContributorsService} from "#src/services";
import {NextFunction, Request, Response} from "express";

class ProjectsContributorsController {
	static async getByProjectId(req: Request, res: Response, next: NextFunction) {
		try {
			const {projectId} = req.params;
			const userId = res.locals.user?.id!;

			const contributors = await ProjectsContributorsService.getByProjectId({
				projectId,
				userId
			});

			res.json(contributors);
		} catch (e) {
			next(e);
		}
	}

	static async leave(req: Request, res: Response, next: NextFunction) {
		try {
			const {projectId} = req.params;
			const userId = res.locals.user?.id!;

			await ProjectsContributorsService.leave({
				projectId,
				userId
			});

			res.json({success: true});
		} catch (e) {
			next(e);
		}
	}
}

export default ProjectsContributorsController;
