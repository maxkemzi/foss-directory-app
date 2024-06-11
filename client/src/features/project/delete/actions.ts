"use server";

import {isApiError} from "#src/shared/apis/lib";
import projectsApi from "#src/shared/apis/projects";

const deleteProject = async (projectId: string) => {
	try {
		await projectsApi.deleteById(projectId);
		return {success: "The project has been deleted"};
	} catch (e) {
		const error = isApiError(e) ? e.message : "Error deleting the project";
		return {error};
	}
};

export {deleteProject};
