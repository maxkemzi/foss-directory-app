import {
	ApiResponseWithPagination,
	PaginationSearchParams,
	RoleFromApi
} from "../types";

type FetchRolesSearchParams = PaginationSearchParams & {search?: string};
type FetchRolesResponseData = RoleFromApi[];
type FetchRolesResponse = ApiResponseWithPagination<FetchRolesResponseData>;

export type {FetchRolesResponse, FetchRolesSearchParams};
