"use server";

import {isApiError} from "#src/shared/apis/lib";
import projectsApi from "#src/shared/apis/projects";

const leaveProject = async (projectId: string) => {
	try {
		await projectsApi.leaveById(projectId);
		return {success: "You have left the project"};
	} catch (e) {
		const error = isApiError(e) ? e.message : "Error leaving the project";
		return {error};
	}
};

export {leaveProject};
