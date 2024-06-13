"use server";

import {isApiError} from "#src/shared/apis/lib";
import rolesApi, {
	FetchRolesResponse,
	FetchRolesSearchParams
} from "#src/shared/apis/roles";
import {AppError} from "#src/shared/error";
import {getErrorMessage} from "#src/shared/helpers";
import {SafeAction} from "#src/shared/hooks";

const getAll = async (params?: FetchRolesSearchParams) => {
	try {
		const response = await rolesApi.fetchAll(params);
		return response;
	} catch (e) {
		const message = isApiError(e) ? e.message : "Error fetching roles";
		throw new AppError(message);
	}
};

const safeGetAll: SafeAction<
	typeof getAll,
	FetchRolesResponse
> = async params => {
	try {
		const response = await getAll(params);
		return {success: "Roles has been fetched", data: response};
	} catch (e) {
		return {error: getErrorMessage(e)};
	}
};

export {getAll, safeGetAll};
