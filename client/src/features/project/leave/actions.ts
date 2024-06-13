"use server";

import {isApiError} from "#src/shared/apis/lib";
import projectsApi from "#src/shared/apis/projects";
import {AppError} from "#src/shared/error";
import {getErrorMessage} from "#src/shared/helpers";
import {SafeAction} from "#src/shared/hooks";

const leaveProjectById = async (id: string) => {
	try {
		await projectsApi.leaveById(id);
	} catch (e) {
		const message = isApiError(e) ? e.message : "Error leaving the project";
		throw new AppError(message);
	}
};

const safeLeaveProjectById: SafeAction<typeof leaveProjectById> = async id => {
	try {
		await leaveProjectById(id);
		return {success: "You have left the project"};
	} catch (e) {
		return {error: getErrorMessage(e)};
	}
};

export {leaveProjectById, safeLeaveProjectById};
