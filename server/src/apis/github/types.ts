import {GithubRepoDto} from "#src/dtos";
import {GithubRepo} from "#src/types";

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

type AuthReposApiResponse = GithubRepo[];
type AuthReposResponse = GithubRepoDto[];

export type {
	AuthReposApiResponse,
	AuthReposResponse,
	OAuthTokenApiResponse,
	OAuthTokenResponse,
	OAuthUrlParams
};
