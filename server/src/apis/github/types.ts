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

type AuthReposResponse = GithubRepo[];

export type {
	GithubRepo,
	AuthReposResponse,
	OAuthTokenApiResponse,
	OAuthTokenResponse,
	OAuthUrlParams
};
