"use server";

import {isApiError} from "#src/shared/apis/lib";
import projectRequestsApi from "#src/shared/apis/projects/requests";
import {AppError} from "#src/shared/error";
import {getErrorMessage} from "#src/shared/helpers";
import {SafeAction} from "#src/shared/hooks";

const createProjectRequest = async (data: {
	projectId: string;
	projectRoleId: string;
}) => {
	try {
		await projectRequestsApi.create(data);
	} catch (e) {
		const message = isApiError(e) ? e.message : "Error creating request";
		throw new AppError(message);
	}
};

const safeCreateProjectRequest: SafeAction<
	typeof createProjectRequest
> = async data => {
	try {
		await createProjectRequest(data);
		return {success: "Request has been created"};
	} catch (e) {
		return {error: getErrorMessage(e)};
	}
};

export {createProjectRequest, safeCreateProjectRequest};
