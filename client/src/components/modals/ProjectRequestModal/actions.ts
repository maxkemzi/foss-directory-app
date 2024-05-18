"use server";

import {fetchCreateProjectRequest} from "#src/apis/projects/requests";
import {FormState} from "./types";

const createProjectRequest = async (prevState: FormState) => {
	const {projectId, projectRoleId} = prevState.data;
	if (!projectId || !projectRoleId) {
		return prevState;
	}

	await fetchCreateProjectRequest({projectId, projectRoleId});
	return {...prevState, success: true};
};

export {createProjectRequest};
