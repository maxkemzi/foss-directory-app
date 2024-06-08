import {tagService} from "#src/services";
import {NextFunction, Request, Response} from "express";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const tags = await tagService.getAll();

		res.json(tags);
	} catch (e) {
		next(e);
	}
};

export default {getAll};
