"use server";

import {isApiError} from "#src/shared/apis/lib";
import projectUsersApi, {
	FetchProjectUsersSearchParams,
	FetchProjectUsersResponse
} from "#src/shared/apis/projects/users";
import {AppError} from "#src/shared/error";
import {getErrorMessage} from "#src/shared/helpers";
import {SafeAction} from "#src/shared/hooks";

const getByProjectId = async (
	id: string,
	params?: FetchProjectUsersSearchParams
) => {
	try {
		const response = await projectUsersApi.fetchByProjectId(id, params);
		return response;
	} catch (e) {
		const message = isApiError(e) ? e.message : "Error fetching project users";
		throw new AppError(message);
	}
};

const safeGetByProjectId: SafeAction<
	typeof getByProjectId,
	FetchProjectUsersResponse
> = async (id, params?) => {
	try {
		const response = await getByProjectId(id, params);
		return {success: "Project users have been fetched", data: response};
	} catch (e) {
		return {error: getErrorMessage(e)};
	}
};

export {getByProjectId, safeGetByProjectId};
