import {env} from "#src/config";
import {ApiError} from "#src/lib";
import {GithubService, JwtService} from "#src/services";
import {
	Header,
	calcTotalPages,
	parseLimitString,
	parsePageString,
	parseSearchString
} from "#src/utils";
import {NextFunction, Request, Response} from "express";

class GithubController {
	static async getAuthUrlAndCsrfToken(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const userId = res.locals.user?.id;
			if (!userId) {
				throw new ApiError(401, "Unauthorized");
			}

			const csrfToken = JwtService.generateCsrfToken({userId});
			const url = GithubService.getOAuthUrl(csrfToken);

			res.json({csrfToken, url});
		} catch (e) {
			next(e);
		}
	}

	static async createConnection(
		req: Request,
		res: Response,
		next: NextFunction
	) {
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

			const payload = JwtService.verifyCsrfToken<{userId: string}>(state);
			if (!payload) {
				throw new ApiError(401, "Unauthorized.");
			}

			await GithubService.createConnection({userId: payload.userId, code});

			res.redirect(`${env.PUBLIC_CLIENT_URL}/success?token=${state}`);
		} catch (e) {
			next(e);
		}
	}

	static async getReposForUser(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const userId = res.locals.user?.id;
			if (!userId) {
				throw new ApiError(401, "Unauthorized");
			}

			const token = res.locals.githubConnection?.token;
			if (!token) {
				throw new ApiError(401, "Unauthorized");
			}

			const {page, limit, search} = req.query;

			if (page && typeof page !== "string") {
				throw new ApiError(400, '"page" param must be a string');
			}

			if (limit && typeof limit !== "string") {
				throw new ApiError(400, '"limit" param must be a string');
			}

			if (search && typeof search !== "string") {
				throw new ApiError(400, '"search" param must be a string');
			}

			const parsedPage = parsePageString(page);
			const parsedLimit = parseLimitString(limit);
			const parsedSearch = parseSearchString(search);

			const {repos, totalCount} = await GithubService.getReposByToken(token, {
				userId,
				page: parsedPage,
				limit: parsedLimit,
				search: parsedSearch
			});

			res.set({
				[Header.TOTAL_COUNT]: totalCount,
				[Header.PAGE]: parsedPage,
				[Header.PAGE_LIMIT]: parsedLimit,
				[Header.TOTAL_PAGES]: calcTotalPages(totalCount, parsedLimit)
			});
			res.json(repos);
		} catch (e) {
			next(e);
		}
	}
}

export default GithubController;
