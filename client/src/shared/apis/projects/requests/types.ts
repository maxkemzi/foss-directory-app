import {
	ApiResponse,
	ApiResponseWithPagination,
	PaginationSearchParams,
	ProjectRequestFromApi
} from "../../types";

interface CreateProjectRequestBody {
	projectId: string;
	projectRoleId: string;
}

interface CreateProjectRequestResponseData {
	success: boolean;
}
type CreateProjectRequestResponse =
	ApiResponse<CreateProjectRequestResponseData>;

interface AcceptProjectRequestResponseData {
	success: boolean;
}
type AcceptProjectRequestResponse =
	ApiResponse<AcceptProjectRequestResponseData>;

interface RejectProjectRequestResponseData {
	success: boolean;
}
type RejectProjectRequestResponse =
	ApiResponse<RejectProjectRequestResponseData>;

type FetchProjectRequestsSearchParams = PaginationSearchParams;

type FetchProjectRequestsResponseData = ProjectRequestFromApi[];
type FetchProjectRequestsResponse =
	ApiResponseWithPagination<FetchProjectRequestsResponseData>;

export type {
	FetchProjectRequestsSearchParams,
	AcceptProjectRequestResponse,
	CreateProjectRequestBody,
	CreateProjectRequestResponse,
	FetchProjectRequestsResponse,
	RejectProjectRequestResponse
};
