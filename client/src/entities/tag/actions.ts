"use server";

import {isApiError} from "#src/shared/apis/lib";
import tagsApi, {FetchTagsSearchParams} from "#src/shared/apis/tags";
import {AppError} from "#src/shared/error";
import {getErrorMessage} from "#src/shared/helpers";

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

const getAllSafe = async (params?: FetchTagsSearchParams) => {
	try {
		const response = await getAll(params);
		return {success: "Tags has been fetched", response};
	} catch (e) {
		return {error: getErrorMessage(e)};
	}
};

export {getAll, getAllSafe};
