import {RolesService} from "#src/services";
import {NextFunction, Request, Response} from "express";

class RolesController {
	static async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const roles = await RolesService.getAll();

			res.json(roles);
		} catch (e) {
			next(e);
		}
	}
}

export default RolesController;
