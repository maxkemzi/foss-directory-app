import {GithubService} from "#src/services";
import {NextFunction, Request, Response} from "express";

class GithubController {
	static async connect(req: Request, res: Response, next: NextFunction) {
		try {
			const {id} = res.locals.user!;
			const {code} = req.body;

			await GithubService.connect(id, code);

			res.json({success: true});
		} catch (e) {
			next(e);
		}
	}

	static async connected(req: Request, res: Response, next: NextFunction) {
		try {
			const {id} = res.locals.user!;

			const connected = await GithubService.isConnected(id);

			res.json({connected});
		} catch (e) {
			next(e);
		}
	}
}

export default GithubController;
