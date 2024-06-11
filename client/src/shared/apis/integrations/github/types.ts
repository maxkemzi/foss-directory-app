import {ApiResponse, RepoFromApi} from "../../types";

interface FetchConnectionUrlResponseData {
	url: string;
	csrfToken: string;
}
type FetchConnectionUrlResponse = ApiResponse<FetchConnectionUrlResponseData>;

type FetchReposResponseData = RepoFromApi[];
type FetchReposResponse = ApiResponse<FetchReposResponseData>;

export type {FetchConnectionUrlResponse, FetchReposResponse};
