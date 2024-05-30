import {fetchApiWithAuth} from "#src/shared/auth";
import {CacheTag} from "#src/shared/constants";
import {
	CreateProjectBody,
	CreateProjectResponse,
	FetchProjectResponse,
	FetchProjectsResponse
} from "./types";

const BASE_URL = "/projects";

const fetchCreateProject = async (
	body: CreateProjectBody
): Promise<CreateProjectResponse> => {
	const response = await fetchApiWithAuth(BASE_URL, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(body)
	});
	return response.json();
};

const fetchAllProjects = async (): Promise<FetchProjectsResponse> => {
	const response = await fetchApiWithAuth(BASE_URL, {
		next: {tags: [CacheTag.PROJECTS]}
	});
	return response.json();
};

const fetchMyProjects = async (): Promise<FetchProjectsResponse> => {
	const response = await fetchApiWithAuth(`${BASE_URL}/auth`, {
		next: {tags: [CacheTag.PROJECTS]}
	});
	return response.json();
};

const fetchContributedProjects = async (): Promise<FetchProjectsResponse> => {
	const response = await fetchApiWithAuth(`${BASE_URL}/contributed`, {
		next: {tags: [CacheTag.PROJECTS]}
	});
	return response.json();
};

const fetchProjectById = async (id: string): Promise<FetchProjectResponse> => {
	const response = await fetchApiWithAuth(`${BASE_URL}/${id}`);
	return response.json();
};

const fetchDeleteProjectById = async (
	id: string
): Promise<FetchProjectResponse> => {
	const response = await fetchApiWithAuth(`${BASE_URL}/${id}`, {
		method: "DELETE"
	});
	return response.json();
};

export {
	fetchAllProjects,
	fetchContributedProjects,
	fetchCreateProject,
	fetchMyProjects,
	fetchProjectById,
	fetchDeleteProjectById
};
