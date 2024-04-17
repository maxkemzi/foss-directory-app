import {ApiError} from "#src/lib";
import {GithubService, JwtTokensService} from "#src/services";
import {NextFunction, Request, Response} from "express";

class GithubController {
	static async authenticate(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = res.locals.user?.id!;

			const {url, CsrfToken} = await GithubService.getAuthUrl(userId);

			res.json({url, CsrfToken});
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

			if (!code) {
				throw new ApiError(404, 'The "code" query parameter is not provided.');
			}

			if (typeof code !== "string") {
				throw new ApiError(404, 'Invalid "code" query parameter type.');
			}

			const payload = JwtTokensService.verifyCsrf<{userId: number}>(state);
			if (!payload) {
				throw new ApiError(401, "Unauthorized.");
			}

			await GithubService.createConnection(payload.userId, code);

			res.redirect(`${process.env.CLIENT_URL}/success?token=${state}`);
		} catch (e) {
			next(e);
		}
	}

	static async getRepos(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = res.locals.user?.id!;

			const {token} = await GithubService.getConnectionByUserId(userId);
			const repos = await GithubService.getReposByToken(token);

			res.json(repos);
		} catch (e) {
			next(e);
		}
	}
}

export default GithubController;
