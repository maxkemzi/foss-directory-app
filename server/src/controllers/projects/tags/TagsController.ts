import {TagsService} from "#src/services";
import {NextFunction, Request, Response} from "express";

class TagsController {
	static async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const tags = await TagsService.getAll();

			res.json(tags);
		} catch (e) {
			next(e);
		}
	}
}

export default TagsController;
