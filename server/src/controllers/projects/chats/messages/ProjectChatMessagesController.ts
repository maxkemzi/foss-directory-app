import {ProjectChatMessagesService} from "#src/services";
import {NextFunction, Request, Response} from "express";

class ProjectChatMessagesController {
	static async getByProjectId(req: Request, res: Response, next: NextFunction) {
		try {
			const {projectId} = req.params;
			const userId = res.locals.user?.id!;

			const messages = await ProjectChatMessagesService.getByProjectId({
				projectId,
				userId
			});

			res.json(messages);
		} catch (e) {
			next(e);
		}
	}
}

export default ProjectChatMessagesController;
