import {
	ApiResponse,
	ApiResponseWithPagination,
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

type FetchProjectRequestsResponseData = ProjectRequestFromApi[];
type FetchProjectRequestsResponse =
	ApiResponseWithPagination<FetchProjectRequestsResponseData>;

export type {
	CreateProjectRequestBody,
	CreateProjectRequestResponse,
	AcceptProjectRequestResponse,
	RejectProjectRequestResponse,
	FetchProjectRequestsResponse
};
