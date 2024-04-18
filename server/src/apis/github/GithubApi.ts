import {GithubRepoDto} from "#src/dtos";
import {ApiError} from "#src/lib";
import {
	AuthReposApiResponse,
	AuthReposResponse,
	OAuthTokenApiResponse,
	OAuthTokenResponse,
	OAuthUrlParams
} from "./types";

class GithubApi {
	static #BASE_URL = "https://api.github.com";
	static #GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID as string;
	static #GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET as string;

	static getOAuthUrl({state, redirectUri}: Omit<OAuthUrlParams, "clientId">) {
		const searchParams = new URLSearchParams();
		searchParams.set("client_id", GithubApi.#GITHUB_CLIENT_ID);

		if (state) {
			searchParams.set("state", state);
		}

		if (redirectUri) {
			searchParams.set("redirect_uri", redirectUri);
		}

		return `https://github.com/login/oauth/authorize?${searchParams.toString()}`;
	}

	static async fetchOAuthToken(code: string): Promise<OAuthTokenResponse> {
		const searchParams = new URLSearchParams();
		searchParams.set("client_id", GithubApi.#GITHUB_CLIENT_ID);
		searchParams.set("client_secret", GithubApi.#GITHUB_CLIENT_SECRET);
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

		const data = (await response.json()) as OAuthTokenApiResponse;
		return {accessToken: data.access_token};
	}

	static async fetchAuthRepos(token: string): Promise<AuthReposResponse> {
		const searchParams = new URLSearchParams();
		searchParams.set("visibility", "public");
		searchParams.set("affiliation", "owner");
		searchParams.set("sort", "pushed");

		const response = await fetch(
			`${GithubApi.#BASE_URL}/user/repos?${searchParams.toString}`,
			{
				headers: {
					Accept: "application/vnd.github+json",
					Authorization: `Bearer ${token}`
				}
			}
		);

		if (!response.ok) {
			throw new ApiError(404, "Something went wrong.");
		}

		const data = (await response.json()) as AuthReposApiResponse;
		return data.map(repo => new GithubRepoDto(repo));
	}
}

export default GithubApi;
