"use server";

import {isApiError} from "#src/shared/apis/lib";
import tagsApi, {
	FetchTagsResponse,
	FetchTagsSearchParams
} from "#src/shared/apis/tags";
import {AppError} from "#src/shared/error";
import {getErrorMessage} from "#src/shared/helpers";
import {SafeAction} from "#src/shared/hooks";

const getAll = async (params?: FetchTagsSearchParams) => {
	try {
		const response = await tagsApi.fetchAll(params);
		return response;
	} catch (e) {
		console.log(e);
		const message = isApiError(e) ? e.message : "Error fetching tags";
		throw new AppError(message);
	}
};

const safeGetAll: SafeAction<
	typeof getAll,
	FetchTagsResponse
> = async params => {
	try {
		const response = await getAll(params);
		return {success: "Tags has been fetched", data: response};
	} catch (e) {
		return {error: getErrorMessage(e)};
	}
};

export {getAll, safeGetAll};
