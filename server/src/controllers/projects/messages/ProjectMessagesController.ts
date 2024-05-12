import {ProjectMessagesService} from "#src/services";
import {NextFunction, Request, Response} from "express";

class ProjectMessagesController {
	static async getByProjectId(req: Request, res: Response, next: NextFunction) {
		try {
			const {id} = req.params;
			const userId = res.locals.user?.id!;

			const messages = await ProjectMessagesService.getByProjectId({
				projectId: id,
				userId
			});

			res.json(messages);
		} catch (e) {
			next(e);
		}
	}
}

export default ProjectMessagesController;
