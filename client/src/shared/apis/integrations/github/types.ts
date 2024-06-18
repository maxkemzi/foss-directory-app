import {
	ApiResponse,
	ApiResponseWithPagination,
	PaginationSearchParams,
	RepoFromApi
} from "../../types";

interface FetchConnectionUrlResponseData {
	url: string;
	csrfToken: string;
}
type FetchConnectionUrlResponse = ApiResponse<FetchConnectionUrlResponseData>;

type FetchReposSearchParams = PaginationSearchParams & {search?: string};
type FetchReposResponse = ApiResponseWithPagination<RepoFromApi[]>;

export type {
	FetchConnectionUrlResponse,
	FetchReposResponse,
	FetchReposSearchParams
};
