import {GithubApi} from "#src/apis";
import {GithubConnectionModel} from "#src/db/models";
import {ApiError} from "#src/lib";
import JwtTokensService from "../../JwtTokensService";

class GithubService {
	static async getOAuthUrl(userId: number) {
		const csrfToken = JwtTokensService.generateCsrf({userId});
		const redirectUri = `${process.env.SERVER_URL}/api/integrations/github/callback`;

		const url = GithubApi.getOAuthUrl({state: csrfToken, redirectUri});
		return {url, csrfToken};
	}

	static async createConnection(userId: number, code: string) {
		const connection = await GithubConnectionModel.getByUserId(userId);
		if (connection) {
			throw new ApiError(400, "Your account had already been connected.");
		}

		const {accessToken} = await GithubApi.fetchOAuthToken(code);

		await GithubConnectionModel.create({
			userId,
			token: accessToken
		});
	}

	static async getConnectionByUserId(id: number) {
		const connection = await GithubConnectionModel.getByUserId(id);
		if (!connection) {
			throw new ApiError(404, "Your account is not connected to github.");
		}

		return connection;
	}

	static getAuthRepos(token: string) {
		return GithubApi.fetchAuthRepos(token);
	}
}

export default GithubService;
