import {ApiError} from "#src/lib";
import {githubService, jwtService} from "#src/services";
import {
	parsePageString,
	parseLimitString,
	parseSearchString,
	calcTotalPages,
	Header
} from "#src/utils";
import {NextFunction, Request, Response} from "express";

const getAuthUrlAndCsrfToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = res.locals.user?.id;
		if (!userId) {
			throw new ApiError(401, "Unauthorized");
		}

		const csrfToken = jwtService.generateCsrfToken({userId});
		const url = githubService.getOAuthUrl(csrfToken);

		res.json({csrfToken, url});
	} catch (e) {
		next(e);
	}
};

const createConnection = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
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

		const payload = jwtService.verifyCsrfToken<{userId: string}>(state);
		if (!payload) {
			throw new ApiError(401, "Unauthorized.");
		}

		await githubService.createConnection({userId: payload.userId, code});

		res.redirect(`${process.env.PUBLIC_CLIENT_URL}/success?token=${state}`);
	} catch (e) {
		next(e);
	}
};

const getReposForUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
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

		const {repos, totalCount} = await githubService.getReposByToken(token, {
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
};

export default {getAuthUrlAndCsrfToken, createConnection, getReposForUser};
