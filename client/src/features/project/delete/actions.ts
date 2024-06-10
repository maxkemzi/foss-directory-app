"use server";

import {isApiError} from "#src/shared/api/lib";
import {fetchDeleteProjectById} from "#src/shared/api/projects";

const deleteProject = async (projectId: string) => {
	try {
		await fetchDeleteProjectById(projectId);
		return {success: "The project has been deleted"};
	} catch (e) {
		const error = isApiError(e) ? e.message : "Error deleting the project";
		return {error};
	}
};

export {deleteProject};
