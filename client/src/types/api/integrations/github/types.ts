import {RepoFromApi} from "../../types";

interface FetchUrlResponse {
	url: string;
	CsrfToken: string;
}

type FetchReposResponse = RepoFromApi[];

export type {FetchUrlResponse, FetchReposResponse};
