import {GithubConnectionModel} from "#src/db/models";
import {ApiError} from "#src/lib";
import TokenService from "../token/TokenService";

class GithubService {
	static #CLIENT_ID = process.env.GITHUB_CLIENT_ID as string;
	static #CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET as string;

	static async getAuthUrl(userId: number) {
		const CSRFToken = TokenService.generateCSRF({userId});
		const redirectUri = `${process.env.SERVER_URL}/api/github/callback`;

		const searchParams = new URLSearchParams();
		searchParams.set("client_id", GithubService.#CLIENT_ID);
		searchParams.set("state", CSRFToken);
		searchParams.set("redirect_uri", redirectUri);

		const url = `https://github.com/login/oauth/authorize?${searchParams.toString()}`;
		return {url, CSRFToken};
	}

	static async createConnection(userId: number, code: string) {
		const connection = await GithubConnectionModel.findByUserId(userId);
		if (connection) {
			throw new ApiError(400, "Your account had already been connected.");
		}

		const searchParams = new URLSearchParams();
		searchParams.set("client_id", GithubService.#CLIENT_ID);
		searchParams.set("client_secret", GithubService.#CLIENT_SECRET);
		searchParams.set("code", code);

		const response = await fetch(
			`https://github.com/login/oauth/access_token?${searchParams.toString()}`,
			{
				headers: {
					Accept: "application/json",
					"Accept-Encoding": "application/json"
				}
			}
		);

		if (!response.ok) {
			throw new ApiError(404, "Something went wrong.");
		}

		const {access_token: accessToken} = await response.json();
		await GithubConnectionModel.create({
			user_id: userId,
			token: accessToken
		});
	}

	static async isConnected(userId: number) {
		const connection = await GithubConnectionModel.findByUserId(userId);
		return connection != null;
	}
}

export default GithubService;
