import {
	ApiResponseWithPagination,
	PaginationSearchParams,
	TagFromApi
} from "../types";

type FetchTagsSearchParams = PaginationSearchParams & {search?: string};
type FetchTagsResponseData = TagFromApi[];
type FetchTagsResponse = ApiResponseWithPagination<FetchTagsResponseData>;

export type {FetchTagsSearchParams, FetchTagsResponse};
