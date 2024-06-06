import {ProjectChatsService} from "#src/services";
import {NextFunction, Request, Response} from "express";

class ProjectChatsController {
	static async getByAuth(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = res.locals.user?.id!;

			const chats = await ProjectChatsService.getByUserId(userId);

			res.json(chats);
		} catch (e) {
			next(e);
		}
	}

	static async getByProjectId(req: Request, res: Response, next: NextFunction) {
		try {
			const {projectId} = req.params;
			const userId = res.locals.user?.id!;

			const chat = await ProjectChatsService.getByProjectId({
				projectId,
				userId
			});

			res.json(chat);
		} catch (e) {
			next(e);
		}
	}
}

export default ProjectChatsController;
