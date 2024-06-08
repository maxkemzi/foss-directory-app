import {roleService} from "#src/services";
import {NextFunction, Request, Response} from "express";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const roles = await roleService.getAll();

		res.json(roles);
	} catch (e) {
		next(e);
	}
};

export default {getAll};
