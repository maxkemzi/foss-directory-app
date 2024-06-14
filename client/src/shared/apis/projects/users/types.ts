import {
	ApiResponseWithPagination,
	PaginationSearchParams,
	ProjectUserFromApi
} from "../../types";

type FetchProjectUsersSearchParams = PaginationSearchParams;

type FetchProjectUsersResponseData = ProjectUserFromApi[];
type FetchProjectUsersResponse =
	ApiResponseWithPagination<FetchProjectUsersResponseData>;

export type {FetchProjectUsersResponse, FetchProjectUsersSearchParams};
