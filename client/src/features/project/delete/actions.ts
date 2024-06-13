"use server";

import {isApiError} from "#src/shared/apis/lib";
import projectsApi from "#src/shared/apis/projects";
import {AppError} from "#src/shared/error";
import {getErrorMessage} from "#src/shared/helpers";
import {SafeAction} from "#src/shared/hooks";

const deleteProjectById = async (id: string) => {
	try {
		await projectsApi.deleteById(id);
	} catch (e) {
		const message = isApiError(e) ? e.message : "Error deleting the project";
		throw new AppError(message);
	}
};

const safeDeleteProjectById: SafeAction<
	typeof deleteProjectById
> = async id => {
	try {
		await deleteProjectById(id);
		return {success: "The project has been deleted"};
	} catch (e) {
		return {error: getErrorMessage(e)};
	}
};

export {safeDeleteProjectById};
