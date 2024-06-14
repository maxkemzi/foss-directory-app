"use server";

import {isApiError} from "#src/shared/apis/lib";
import projectMessagesApi, {
	FetchProjectMessagesResponse,
	FetchProjectMessagesSearchParams
} from "#src/shared/apis/projects/messages";
import {AppError} from "#src/shared/error";
import {getErrorMessage} from "#src/shared/helpers";
import {SafeAction} from "#src/shared/hooks";

const getByProjectId = async (
	id: string,
	params?: FetchProjectMessagesSearchParams
) => {
	try {
		const response = await projectMessagesApi.fetchByProjectId(id, params);
		return response;
	} catch (e) {
		const message = isApiError(e) ? e.message : "Error fetching messages";
		throw new AppError(message);
	}
};

const safeGetByProjectId: SafeAction<
	typeof getByProjectId,
	FetchProjectMessagesResponse
> = async (id, params?) => {
	try {
		const response = await projectMessagesApi.fetchByProjectId(id, params);
		return {success: "Messages have been fetched", data: response};
	} catch (e) {
		return {error: getErrorMessage(e)};
	}
};

export {getByProjectId, safeGetByProjectId};
