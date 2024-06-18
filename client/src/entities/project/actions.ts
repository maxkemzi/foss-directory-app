"use server";

import {isApiError} from "#src/shared/apis/lib";
import projectsApi, {
	FetchProjectsResponse,
	FetchProjectsSearchParams
} from "#src/shared/apis/projects";
import {AppError} from "#src/shared/error";
import {getErrorMessage} from "#src/shared/helpers";
import {SafeAction} from "#src/shared/hooks";

const getAll = async (params?: FetchProjectsSearchParams) => {
	try {
		const response = await projectsApi.fetchAll(params);
		return response;
	} catch (e) {
		const message = isApiError(e) ? e.message : "Error fetching projects";
		throw new AppError(message);
	}
};

const safeGetAll: SafeAction<typeof getAll, FetchProjectsResponse> = async (
	params?
) => {
	try {
		const response = await getAll(params);
		return {success: "Projects have been fetched", data: response};
	} catch (e) {
		return {error: getErrorMessage(e)};
	}
};

const getByOwnership = async (params?: FetchProjectsSearchParams) => {
	try {
		const response = await projectsApi.fetchByOwnership(params);
		return response;
	} catch (e) {
		const message = isApiError(e) ? e.message : "Error fetching projects";
		throw new AppError(message);
	}
};

const safeGetByOwnership: SafeAction<
	typeof getByOwnership,
	FetchProjectsResponse
> = async (params?) => {
	try {
		const response = await getByOwnership(params);
		return {success: "Projects have been fetched", data: response};
	} catch (e) {
		return {error: getErrorMessage(e)};
	}
};

const getByMembership = async (params?: FetchProjectsSearchParams) => {
	try {
		const response = await projectsApi.fetchByMembership(params);
		return response;
	} catch (e) {
		const message = isApiError(e) ? e.message : "Error fetching projects";
		throw new AppError(message);
	}
};

const safeGetByMembership: SafeAction<
	typeof getByMembership,
	FetchProjectsResponse
> = async (params?) => {
	try {
		const response = await getByMembership(params);
		return {success: "Projects have been fetched", data: response};
	} catch (e) {
		return {error: getErrorMessage(e)};
	}
};

const getById = async (id: string) => {
	try {
		const response = await projectsApi.fetchById(id);
		return response;
	} catch (e) {
		const message = isApiError(e) ? e.message : "Error fetching project";
		throw new AppError(message);
	}
};

export {
	getAll,
	safeGetAll,
	getById,
	getByMembership,
	getByOwnership,
	safeGetByOwnership,
	safeGetByMembership
};
