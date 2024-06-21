import {
	ApiResponse,
	ApiResponseWithPagination,
	PaginationSearchParams,
	ProjectFromApi
} from "../types";

type FetchProjectsVariant = "all" | "owned" | "member";
type FetchProjectsSearchParams = PaginationSearchParams & {
	search?: string;
	variant?: FetchProjectsVariant;
};
type FetchProjectsOptions = Omit<FetchProjectsSearchParams, "variant">;

type FetchProjectsResponseData = ProjectFromApi[];
type FetchProjectsResponse =
	ApiResponseWithPagination<FetchProjectsResponseData>;

type FetchProjectResponseData = ProjectFromApi;
type FetchProjectResponse = ApiResponse<FetchProjectResponseData>;

interface CreateProjectBody {
	name: string;
	description: string;
	repoUrl: string;
	role: string;
	tags: string[];
	roles: Record<string, number>;
}
type CreateProjectResponseData = ProjectFromApi;
type CreateProjectResponse = ApiResponse<CreateProjectResponseData>;

export type {
	FetchProjectsSearchParams,
	FetchProjectsOptions,
	CreateProjectBody,
	CreateProjectResponse,
	FetchProjectResponse,
	FetchProjectsResponse,
	FetchProjectsVariant
};
