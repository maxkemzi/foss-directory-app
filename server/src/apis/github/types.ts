import {GithubRateLimitDocument} from "#src/db";

interface GithubRepo {
	id: number;
	name: string;
	description: string | null;
	html_url: string;
	topics: string[];
}

interface OAuthUrlParams {
	clientId: string;
	state?: string;
	redirectUri?: string;
}

interface OAuthTokenApiResponse {
	access_token: string;
}
interface OAuthTokenResponse {
	accessToken: string;
}

type OnRateLimitExceeded = (
	data: Pick<GithubRateLimitDocument, "resource" | "resetTime">
) => void;

interface FetchReposOptions {
	limit: number;
	page: number;
	search?: string;
	onRateLimitExceeded?: OnRateLimitExceeded;
}

interface FetchGithubApiOptions {
	token: string;
	onRateLimitExceeded?: OnRateLimitExceeded;
}

interface FetchSearchReposApiResponse {
	total_count: number;
	items: GithubRepo[];
}

interface FetchReposResponse {
	data: GithubRepo[];
	totalCount: number;
}

export type {
	FetchGithubApiOptions,
	FetchReposOptions,
	FetchReposResponse,
	FetchSearchReposApiResponse,
	GithubRepo,
	OAuthTokenApiResponse,
	OAuthTokenResponse,
	OAuthUrlParams
};
