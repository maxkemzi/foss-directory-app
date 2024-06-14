"use server";

import {isApiError} from "#src/shared/apis/lib";
import projectRequestsApi, {
	FetchProjectRequestsResponse
} from "#src/shared/apis/projects/requests";
import {FetchProjectRequestsSearchParams} from "#src/shared/apis/projects/requests/types";
import {AppError} from "#src/shared/error";
import {getErrorMessage} from "#src/shared/helpers";
import {SafeAction} from "#src/shared/hooks";

const getIncoming = async (params?: FetchProjectRequestsSearchParams) => {
	try {
		const response = await projectRequestsApi.fetchIncoming(params);
		return response;
	} catch (e) {
		const message = isApiError(e) ? e.message : "Error fetching requests";
		throw new AppError(message);
	}
};

const safeGetIncoming: SafeAction<
	typeof getIncoming,
	FetchProjectRequestsResponse
> = async (params?) => {
	try {
		const response = await getIncoming(params);
		return {success: "Project requests have been fetched", data: response};
	} catch (e) {
		return {error: getErrorMessage(e)};
	}
};

export {getIncoming, safeGetIncoming};
