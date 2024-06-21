"use server";

import {isApiError} from "#src/shared/apis/lib";
import projectsApi, {
	FetchProjectsResponse,
	FetchProjectsVariant
} from "#src/shared/apis/projects";
import {FetchProjectsOptions} from "#src/shared/apis/projects/types";
import {AppError} from "#src/shared/error";
import {getErrorMessage} from "#src/shared/helpers";
import {SafeAction} from "#src/shared/hooks";

const getByVariant = async (
	variant: FetchProjectsVariant,
	opts?: FetchProjectsOptions
) => {
	try {
		const response = await projectsApi.fetchByVariant(variant, opts);
		return response;
	} catch (e) {
		const message = isApiError(e) ? e.message : "Error fetching projects";
		throw new AppError(message);
	}
};

const safeGetByVariant: SafeAction<
	typeof getByVariant,
	FetchProjectsResponse
> = async (variant, opts?) => {
	try {
		const response = await getByVariant(variant, opts);
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

export {getById, getByVariant, safeGetByVariant};
