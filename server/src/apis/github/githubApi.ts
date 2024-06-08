import {ApiError} from "#src/lib";
import {
	AuthReposResponse,
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
		throw new ApiError(404, "Something went wrong.");
	}

	const data = (await response.json()) as OAuthTokenApiResponse;
	return {accessToken: data.access_token};
};

const fetchReposByToken = async (token: string): Promise<AuthReposResponse> => {
	const searchParams = new URLSearchParams();
	searchParams.set("visibility", "public");
	searchParams.set("affiliation", "owner");
	searchParams.set("sort", "pushed");

	const response = await fetch(
		`${BASE_URL}/user/repos?${searchParams.toString()}`,
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

	return response.json();
};

export default {fetchOAuthToken, fetchReposByToken};
