import {RepoFromApi} from "../../types";

interface FetchUrlResponse {
	url: string;
	csrfToken: string;
}

type FetchReposResponse = RepoFromApi[];

export type {FetchReposResponse, FetchUrlResponse};
