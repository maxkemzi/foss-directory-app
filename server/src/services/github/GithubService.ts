import {GithubApi} from "#src/apis";
import {env} from "#src/config";
import {
	Db,
	GithubConnectionModel,
	GithubRateLimitModel,
	isGithubRateLimitExceeded
} from "#src/db";
import {ErrorFactory, GithubError} from "#src/lib";
import {AesEncryptor} from "#src/services/lib";
import {GithubRepoDto} from "../dtos";
import {GetReposOptions, GetReposReturn} from "./types";

class GithubService {
	private static PUBLIC_SERVER_URL = env.PUBLIC_SERVER_URL;
	private static GITHUB_CLIENT_ID = env.GITHUB_CLIENT_ID;

	static getOAuthUrl(state: string) {
		const redirectUri = `${this.PUBLIC_SERVER_URL}/api/integrations/github/connect`;

		const searchParams = new URLSearchParams();
		searchParams.set("client_id", this.GITHUB_CLIENT_ID);
		searchParams.set("state", state);
		searchParams.set("redirect_uri", redirectUri);

		return `https://github.com/login/oauth/authorize?${searchParams.toString()}`;
	}

	static async createConnection({
		userId,
		code
	}: {
		userId: string;
		code: string;
	}) {
		const client = await Db.getClient();
		const model = new GithubConnectionModel(client);

		try {
			const connection = await model.findByUserId(userId);
			if (connection) {
				throw ErrorFactory.getForbidden(GithubError.ALREADY_CONNECTED);
			}

			const {accessToken} = await GithubApi.fetchOAuthToken(code);

			const encryptedToken = AesEncryptor.encrypt(accessToken);

			await model.insert({userId, token: encryptedToken});
		} finally {
			client.release();
		}
	}

	static async getConnectionByUserId(id: string) {
		const client = await Db.getClient();
		const model = new GithubConnectionModel(client);

		try {
			const connection = await model.findByUserId(id);
			if (!connection) {
				throw ErrorFactory.getForbidden(GithubError.CONNECTION_REQUIRED);
			}

			return connection;
		} finally {
			client.release();
		}
	}

	static async getReposByToken(
		token: string,
		opts: GetReposOptions
	): Promise<GetReposReturn> {
		const {limit, page, search, userId} = opts;

		const client = await Db.getClient();
		const rateLimitModel = new GithubRateLimitModel(client);
		const connectionModel = new GithubConnectionModel(client);

		try {
			const [coreRateLimit, searchRateLimit] = await Promise.all([
				rateLimitModel.findByUserIdAndResource(userId, "core"),
				rateLimitModel.findByUserIdAndResource(userId, "search")
			]);

			const currentTime = Math.floor(Date.now() / 1000);
			if (
				(coreRateLimit &&
					isGithubRateLimitExceeded(coreRateLimit, currentTime)) ||
				(searchRateLimit &&
					isGithubRateLimitExceeded(searchRateLimit, currentTime))
			) {
				throw ErrorFactory.getTooManyRequests(GithubError.RATE_LIMIT_EXCEEDED);
			}

			const decryptedToken = AesEncryptor.decrypt(token);

			const {data, totalCount} = await GithubApi.fetchReposByToken(
				decryptedToken,
				{
					limit,
					page,
					search,
					onRateLimitExceeded: async ({resource, resetTime}) => {
						const connection = await connectionModel.findByUserId(userId);

						if (!connection) {
							throw ErrorFactory.getBadRequest(GithubError.CONNECTION_REQUIRED);
						}

						await rateLimitModel.upsert({
							connectionId: connection.id,
							resetTime,
							resource
						});
					}
				}
			);

			return {repos: data.map(r => new GithubRepoDto(r)), totalCount};
		} finally {
			client.release();
		}
	}
}

export default GithubService;
