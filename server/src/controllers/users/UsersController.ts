import {UsersService} from "#src/services";
import {NextFunction, Request, Response} from "express";

class UsersController {
	static async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = res.locals.user?.id!;

			await UsersService.deleteAccount(userId);

			res.json({success: true});
		} catch (e) {
			next(e);
		}
	}
}

export default UsersController;
