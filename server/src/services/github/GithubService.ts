import {GithubConnectionModel} from "#src/db/models";
import {ApiError} from "#src/lib";

class GithubService {
	static #CLIENT_ID = process.env.GITHUB_CLIENT_ID as string;
	static #CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET as string;

	static async getAuthUrl() {
		const url = `https://github.com/login/oauth/authorize?client_id=${GithubService.#CLIENT_ID}&redirect_uri=http://localhost:5000/api/github/callback`;
		return url;
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
