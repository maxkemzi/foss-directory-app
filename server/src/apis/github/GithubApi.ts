import {env} from "#src/config";
import {isValidGithubRateLimitResource} from "#src/db";
import {ErrorFactory, GithubError} from "#src/lib";
import {delay} from "../helpers";
import {
	FetchGithubApiOptions,
	FetchReposOptions,
	FetchReposResponse,
	FetchSearchReposApiResponse,
	OAuthTokenApiResponse,
	OAuthTokenResponse
} from "./types";

class GithubApi {
	private static BASE_URL = "https://api.github.com";
	private static CLIENT_ID = env.GITHUB_CLIENT_ID;
	private static CLIENT_SECRET = env.GITHUB_CLIENT_SECRET;

	static async fetchOAuthToken(code: string): Promise<OAuthTokenResponse> {
		const searchParams = new URLSearchParams();
		searchParams.set("client_id", this.CLIENT_ID);
		searchParams.set("client_secret", this.CLIENT_SECRET);
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
			const {error} = await response.json();
			if (error === "unverified_user_email") {
				throw ErrorFactory.getForbidden(GithubError.UNVERIFIED_EMAIL);
			}

			throw new Error();
		}

		const data = (await response.json()) as OAuthTokenApiResponse;
		return {accessToken: data.access_token};
	}

	static async fetchReposByToken(
		token: string,
		opts: FetchReposOptions
	): Promise<FetchReposResponse> {
		const {limit, page, search, onRateLimitExceeded} = opts;

		const userResponse = await this.fetchGithubApi("/user", {
			token,
			onRateLimitExceeded
		});

		const user = await userResponse.json();

		const searchParams = new URLSearchParams();
		searchParams.set("sort", "updated");

		let q = `user:${user.login}`;
		if (search) {
			q += ` ${search} in:name`;
		}
		searchParams.set("q", q);

		if (limit) {
			searchParams.set("per_page", String(limit));
		}
		if (page) {
			searchParams.set("page", String(page));
		}

		const reposResponse = await this.fetchGithubApi(
			`/search/repositories?${searchParams.toString()}`,
			{token, onRateLimitExceeded}
		);

		const {total_count: totalCount, items: data} =
			(await reposResponse.json()) as FetchSearchReposApiResponse;

		return {data, totalCount};
	}

	private static async fetchGithubApi(
		url: string,
		opts: FetchGithubApiOptions,
		init: RequestInit = {}
	): Promise<Response> {
		const {token, onRateLimitExceeded} = opts;
		const {headers: initHeaders, ...restInit} = init;

		const response = await fetch(`${this.BASE_URL}${url}`, {
			headers: {
				...initHeaders,
				Accept: "application/vnd.github+json",
				Authorization: `Bearer ${token}`
			},
			...restInit
		});

		if (!response.ok) {
			const {headers, status} = response;

			if (status === 429 || status === 403) {
				let retryAfterSeconds;

				const retryAfter = headers.get("retry-after");
				if (retryAfter) {
					retryAfterSeconds = Number(retryAfter);
				}

				const rateLimitRemaining = headers.get("x-ratelimit-remaining");
				const rateLimitReset = headers.get("x-ratelimit-reset");
				if (rateLimitRemaining === "0" && rateLimitReset) {
					const resetTime = Number(rateLimitReset);
					const currentTime = Math.floor(Date.now() / 1000);
					const diffTime = resetTime - currentTime;
					retryAfterSeconds = retryAfterSeconds
						? Math.max(retryAfterSeconds, diffTime)
						: diffTime;
				}

				retryAfterSeconds ??= 60;

				if (retryAfterSeconds <= 5) {
					await delay(retryAfterSeconds * 1000);
					return this.fetchGithubApi(url, opts);
				}

				const rateLimitResource = headers.get("x-ratelimit-resource");
				if (
					rateLimitResource &&
					isValidGithubRateLimitResource(rateLimitResource)
				) {
					const resetTime = Math.ceil(Date.now() / 1000) + retryAfterSeconds;
					onRateLimitExceeded?.({
						resource: rateLimitResource,
						resetTime
					});
				}

				throw ErrorFactory.getTooManyRequests(GithubError.RATE_LIMIT_EXCEEDED);
			}

			const {error} = await response.json();
			if (error === "bad_verification_code") {
				throw ErrorFactory.getUnauthorized(GithubError.TOKEN_EXPIRED);
			}

			throw new Error();
		}

		return response;
	}
}

export default GithubApi;
