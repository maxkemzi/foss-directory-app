import {AccountService} from "#src/services";
import {NextFunction, Request, Response} from "express";

class AccountController {
	static async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = res.locals?.user?.id!;

			await AccountService.delete(userId);

			res.json({success: true});
		} catch (e) {
			next(e);
		}
	}
}

export default AccountController;
