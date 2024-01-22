import {ApiError} from "#src/lib";
import {GithubService} from "#src/services";
import {NextFunction, Request, Response} from "express";

class GithubController {
	static async authenticate(req: Request, res: Response, next: NextFunction) {
		try {
			const url = await GithubService.getAuthUrl();

			res.redirect(url);
		} catch (e) {
			next(e);
		}
	}

	static async callback(req: Request, res: Response, next: NextFunction) {
		try {
			const {id} = res.locals.user!;
			const {code} = req.query;

			if (!code) {
				throw new ApiError(404, 'The "code" query parameter is not provided.');
			}

			if (typeof code !== "string") {
				throw new ApiError(404, 'Invalid "code" query parameter type.');
			}

			await GithubService.createConnection(id, code);

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
