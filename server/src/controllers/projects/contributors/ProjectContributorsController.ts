import {ProjectsContributorsService} from "#src/services";
import {NextFunction, Request, Response} from "express";

class ProjectsContributorsController {
	static async leave(req: Request, res: Response, next: NextFunction) {
		try {
			const {id} = req.params;
			const userId = res.locals.user?.id!;

			await ProjectsContributorsService.leave({
				projectId: id,
				userId
			});

			res.status(200).json({success: true});
		} catch (e) {
			next(e);
		}
	}
}

export default ProjectsContributorsController;
