"use server";

import {ProjectRequestsApi} from "#src/apis";
import {FormState} from "./types";

const requestRole = async (prevState: FormState) => {
	if (!prevState.data.projectRoleId) {
		return prevState;
	}

	await ProjectRequestsApi.request({
		projectRoleId: prevState.data.projectRoleId
	});
	return {...prevState, success: true};
};

export {requestRole};
