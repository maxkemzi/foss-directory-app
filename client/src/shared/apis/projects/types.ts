import {ApiResponse, ApiResponseWithPagination, ProjectFromApi} from "../types";

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
	CreateProjectBody,
	CreateProjectResponse,
	FetchProjectResponse,
	FetchProjectsResponse
};
