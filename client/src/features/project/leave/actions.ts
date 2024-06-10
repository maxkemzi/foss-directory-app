"use server";

import {isApiError} from "#src/shared/api/lib";
import {fetchLeaveProject} from "#src/shared/api/projects";

const leaveProject = async (projectId: string) => {
	try {
		await fetchLeaveProject(projectId);
		return {success: "You have left the project"};
	} catch (e) {
		const error = isApiError(e) ? e.message : "Error leaving the project";
		return {error};
	}
};

export {leaveProject};
