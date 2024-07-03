import {env} from "#src/config";
import {ErrorFactory, JwtGenerator, JwtVerificator} from "#src/lib";
import {setPaginationHeaders} from "#src/routes/helpers";
import {GithubService} from "#src/services";
import {ApiErrorInfo} from "foss-directory-shared";
import {
	ConnectRequestHandler,
	GetAuthUrlRequestHandler,
	GetReposParsedQuery,
	GetReposRequestHandler
} from "./types";

class GithubController {
	static getAuthUrl: GetAuthUrlRequestHandler = async (req, res, next) => {
		try {
			const userId = res.locals.user?.id;
			if (!userId) {
				throw ErrorFactory.getUnauthorized();
			}

			const csrfToken = JwtGenerator.generateCsrf({userId});
			const url = GithubService.getOAuthUrl(csrfToken);

			res.json({csrfToken, url});
		} catch (e) {
			next(e);
		}
	};

	static connect: ConnectRequestHandler = async (req, res, next) => {
		try {
			const {code, state} = req.query;

			const payload = JwtVerificator.verifyCsrf<{userId: string}>(state);
			if (!payload) {
				throw ErrorFactory.getForbidden(ApiErrorInfo.GITHUB_INVALID_CSRF_TOKEN);
			}

			await GithubService.createConnection({userId: payload.userId, code});

			res.redirect(`${env.PUBLIC_CLIENT_URL}/success?token=${state}`);
		} catch (e) {
			next(e);
		}
	};

	static getRepos: GetReposRequestHandler = async (req, res, next) => {
		try {
			const userId = res.locals.user?.id;
			if (!userId) {
				throw ErrorFactory.getUnauthorized();
			}

			const connection = await GithubService.getConnectionByUserId(userId);
			if (!connection) {
				throw ErrorFactory.getForbidden(
					ApiErrorInfo.GITHUB_CONNECTION_REQUIRED
				);
			}

			const {page, limit, search} = req.query as GetReposParsedQuery;

			const {repos, totalCount} = await GithubService.getReposByToken(
				connection.token,
				{userId, page, limit, search}
			);

			setPaginationHeaders(res, {page, limit, totalCount});
			res.json(repos);
		} catch (e) {
			next(e);
		}
	};
}

export default GithubController;
