"use server";

import {sendProjectRequest} from "#src/apis/projects/requests";
import {FormState} from "./types";

const sendProjectRequestAction = async (prevState: FormState) => {
	const {projectId, projectRoleId} = prevState.data;
	if (!projectId || !projectRoleId) {
		return prevState;
	}

	await sendProjectRequest({projectId, projectRoleId});
	return {...prevState, success: true};
};

export {sendProjectRequestAction};
