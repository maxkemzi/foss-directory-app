"use server";

import {fetchCreateProjectRequest} from "#src/shared/api/projects/requests";
import {FormState, INITIAL_FORM_STATE} from "./constants";

const createProjectRequest = async (prevState: FormState) => {
	const {projectId, projectRoleId} = prevState;
	if (!projectId || !projectRoleId) {
		return prevState;
	}

	try {
		await fetchCreateProjectRequest({projectId, projectRoleId});
		return {
			...INITIAL_FORM_STATE,
			triggerStatusHandler: prevState.triggerStatusHandler,
			auccess: true
		};
	} catch (e) {
		return {
			...INITIAL_FORM_STATE,
			triggerStatusHandler: prevState.error
				? !prevState.triggerStatusHandler
				: prevState.triggerStatusHandler,
			error: "Error creating project request"
		};
	}
};

export {createProjectRequest};
