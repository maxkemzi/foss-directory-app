import {modelHelpers} from "#src/db";
import {ApiError} from "#src/lib";
import {delay} from "../helpers";
import {
	FetchGithubApiOptions,
	FetchReposOptions,
	FetchReposResponse,
	FetchSearchReposApiResponse,
	OAuthTokenApiResponse,
	OAuthTokenResponse
} from "./types";

const BASE_URL = "https://api.github.com";
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID as string;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET as string;

const fetchOAuthToken = async (code: string): Promise<OAuthTokenResponse> => {
	const searchParams = new URLSearchParams();
	searchParams.set("client_id", GITHUB_CLIENT_ID);
	searchParams.set("client_secret", GITHUB_CLIENT_SECRET);
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
			throw new ApiError(401, "You need to verify your GitHub email.");
		}

		throw new ApiError(404, "Error authorizing GitHub.");
	}

	const data = (await response.json()) as OAuthTokenApiResponse;
	return {accessToken: data.access_token};
};

const fetchGithubApi = async (
	url: string,
	opts: FetchGithubApiOptions,
	init: RequestInit = {}
): Promise<Response> => {
	const {token, onRateLimitExceeded} = opts;
	const {headers: initHeaders, ...restInit} = init;

	const response = await fetch(`${BASE_URL}${url}`, {
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
				return fetchGithubApi(url, opts);
			}

			const rateLimitResource = headers.get("x-ratelimit-resource");
			if (
				rateLimitResource &&
				modelHelpers.isValidRateLimitResource(rateLimitResource)
			) {
				const resetTime = Math.ceil(Date.now() / 1000) + retryAfterSeconds;
				onRateLimitExceeded?.({
					resource: rateLimitResource,
					resetTime
				});
			}

			throw new ApiError(
				429,
				"GitHub API rate limit exceeded. Try again later."
			);
		}

		const {error} = await response.json();
		if (error === "bad_verification_code") {
			throw new ApiError(
				401,
				"Your GitHub token has expired, connect to GitHub again."
			);
		}

		throw new ApiError(404, "Something went wrong with requesting GitHub API.");
	}

	return response;
};

const fetchReposByToken = async (
	token: string,
	opts: FetchReposOptions
): Promise<FetchReposResponse> => {
	const {limit, page, search, onRateLimitExceeded} = opts;

	const userResponse = await fetchGithubApi("/user", {
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

	const reposResponse = await fetchGithubApi(
		`/search/repositories?${searchParams.toString()}`,
		{token, onRateLimitExceeded}
	);

	const {total_count: totalCount, items: data} =
		(await reposResponse.json()) as FetchSearchReposApiResponse;

	return {data, totalCount};
};

export default {fetchOAuthToken, fetchReposByToken};
