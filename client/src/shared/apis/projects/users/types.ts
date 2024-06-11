import {ApiResponseWithPagination, ProjectUserFromApi} from "../../types";

type FetchProjectUsersResponseData = ProjectUserFromApi[];
type FetchProjectUsersResponse =
	ApiResponseWithPagination<FetchProjectUsersResponseData>;

export type {FetchProjectUsersResponse};
