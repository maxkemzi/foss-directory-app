"use server";

import {fetchApiWithAuth} from "#src/shared/auth";
import {CacheTag} from "#src/shared/constants";
import {ApiHeader} from "../constants";
import {parseNumericHeader} from "../helpers";
import {
	CreateProjectBody,
	CreateProjectResponse,
	FetchProjectResponse,
	FetchProjectsResponse
} from "./types";

const BASE_URL = "/projects";

const create = async (
	body: CreateProjectBody
): Promise<CreateProjectResponse> => {
	const response = await fetchApiWithAuth(BASE_URL, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(body)
	});

	const data = await response.json();
	return {data};
};

const fetchAll = async (): Promise<FetchProjectsResponse> => {
	const response = await fetchApiWithAuth(BASE_URL, {
		next: {tags: [CacheTag.PROJECTS]}
	});

	const data = await response.json();

	const {headers} = response;
	const totalCount = headers.get(ApiHeader.TOTAL_COUNT);
	const page = headers.get(ApiHeader.PAGE);
	const totalPages = headers.get(ApiHeader.TOTAL_PAGES);

	return {
		data,
		totalCount: parseNumericHeader(totalCount),
		page: parseNumericHeader(page),
		totalPages: parseNumericHeader(totalPages)
	};
};

const fetchByOwnership = async (): Promise<FetchProjectsResponse> => {
	const response = await fetchApiWithAuth(`${BASE_URL}/owned`, {
		next: {tags: [CacheTag.PROJECTS]}
	});

	const data = await response.json();

	const {headers} = response;
	const totalCount = headers.get(ApiHeader.TOTAL_COUNT);
	const page = headers.get(ApiHeader.PAGE);
	const totalPages = headers.get(ApiHeader.TOTAL_PAGES);

	return {
		data,
		totalCount: parseNumericHeader(totalCount),
		page: parseNumericHeader(page),
		totalPages: parseNumericHeader(totalPages)
	};
};

const fetchByMembership = async (): Promise<FetchProjectsResponse> => {
	const response = await fetchApiWithAuth(`${BASE_URL}/membership`, {
		next: {tags: [CacheTag.PROJECTS]}
	});

	const data = await response.json();

	const {headers} = response;
	const totalCount = headers.get(ApiHeader.TOTAL_COUNT);
	const page = headers.get(ApiHeader.PAGE);
	const totalPages = headers.get(ApiHeader.TOTAL_PAGES);

	return {
		data,
		totalCount: parseNumericHeader(totalCount),
		page: parseNumericHeader(page),
		totalPages: parseNumericHeader(totalPages)
	};
};

const fetchById = async (id: string): Promise<FetchProjectResponse> => {
	const response = await fetchApiWithAuth(`${BASE_URL}/${id}`);

	const data = await response.json();
	return {data};
};

const deleteById = async (id: string): Promise<FetchProjectResponse> => {
	const response = await fetchApiWithAuth(`${BASE_URL}/${id}`, {
		method: "DELETE"
	});

	const data = await response.json();
	return {data};
};

const leaveById = async (projectId: string): Promise<void> => {
	await fetchApiWithAuth(`${BASE_URL}/${projectId}/leave`, {
		method: "DELETE"
	});
};

export {
	create,
	fetchAll,
	fetchByOwnership,
	fetchByMembership,
	fetchById,
	deleteById,
	leaveById
};
