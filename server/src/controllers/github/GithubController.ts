import {ApiError} from "#src/lib";
import {GithubService, TokenService} from "#src/services";
import {NextFunction, Request, Response} from "express";

class GithubController {
	static async authenticate(req: Request, res: Response, next: NextFunction) {
		try {
			const {id} = res.locals.user!;

			const {url, CSRFToken} = await GithubService.getAuthUrl(id);

			res.json({url, CSRFToken});
		} catch (e) {
			next(e);
		}
	}

	static async callback(req: Request, res: Response, next: NextFunction) {
		try {
			const {code, state} = req.query;

			if (!state) {
				throw new ApiError(401, "Unauthorized.");
			}

			if (typeof state !== "string") {
				throw new ApiError(404, 'Invalid "state" query parameter type.');
			}

			const payload = TokenService.verifyCSRF<{userId: number}>(state);
			if (!payload) {
				throw new ApiError(401, "Unauthorized.");
			}

			if (!code) {
				throw new ApiError(404, 'The "code" query parameter is not provided.');
			}

			if (typeof code !== "string") {
				throw new ApiError(404, 'Invalid "code" query parameter type.');
			}

			await GithubService.createConnection(payload.userId, code);

			res.redirect(`${process.env.CLIENT_URL}/success?token=${state}`);
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
