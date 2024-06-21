"use server";

import {fetchApiWithAuth} from "#src/shared/auth";
import {CacheTag} from "#src/shared/constants";
import {calcHasMore, getPaginationHeaderValues} from "../helpers";
import {
	CreateProjectBody,
	CreateProjectResponse,
	FetchProjectResponse,
	FetchProjectsOptions,
	FetchProjectsResponse,
	FetchProjectsVariant
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

const fetchByVariant = async (
	variant: FetchProjectsVariant,
	opts: FetchProjectsOptions = {}
): Promise<FetchProjectsResponse> => {
	const response = await fetchApiWithAuth(BASE_URL, {
		next: {tags: [CacheTag.PROJECTS]},
		params: {variant, page: opts.page, limit: opts.limit, search: opts.search}
	});

	const data = await response.json();

	const {headers} = response;
	const {totalCount, page, limit, totalPages} =
		getPaginationHeaderValues(headers);

	return {
		data,
		totalCount,
		page,
		limit,
		hasMore: calcHasMore(page, totalPages)
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

export {create, deleteById, fetchById, fetchByVariant, leaveById};
