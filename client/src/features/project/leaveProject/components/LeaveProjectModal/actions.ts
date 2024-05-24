"use server";

import {fetchLeaveProject} from "#src/shared/api/projects/contributors";
import {FormState, INITIAL_FORM_STATE} from "./constants";

const leaveProject = async (prevState: FormState) => {
	const {projectId} = prevState;
	if (!projectId) {
		return prevState;
	}

	try {
		await fetchLeaveProject(projectId);

		return {
			...INITIAL_FORM_STATE,
			projectId: prevState.projectId,
			triggerStatusHandler: prevState.triggerStatusHandler,
			success: true
		};
	} catch (e) {
		return {
			...INITIAL_FORM_STATE,
			projectId: prevState.projectId,
			triggerStatusHandler: prevState.error
				? !prevState.triggerStatusHandler
				: prevState.triggerStatusHandler,
			error: "Error leaving the project"
		};
	}
};

export {leaveProject};
