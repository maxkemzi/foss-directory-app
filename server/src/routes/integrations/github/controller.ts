import {ApiError} from "#src/lib";
import {githubService, jwtService} from "#src/services";
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

		const repos = await githubService.getReposByUserId(userId);

		res.json(repos);
	} catch (e) {
		next(e);
	}
};

export default {getAuthUrlAndCsrfToken, createConnection, getReposForUser};
