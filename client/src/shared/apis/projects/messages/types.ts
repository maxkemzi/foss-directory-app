import {
	ApiResponseWithPagination,
	PaginationSearchParams,
	ProjectMessageFromApi
} from "../../types";

type FetchProjectMessagesSearchParams = PaginationSearchParams;
type FetchProjectMessagesResponseData = ProjectMessageFromApi[];
type FetchProjectMessagesResponse =
	ApiResponseWithPagination<FetchProjectMessagesResponseData>;

export type {FetchProjectMessagesResponse, FetchProjectMessagesSearchParams};
