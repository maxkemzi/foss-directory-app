"use server";

import {fetchLeaveProject} from "#src/apis/projects/contributors";
import {CacheTag} from "#src/constants";
import {revalidateTag} from "next/cache";
import {FormState} from "./types";

const leaveProject = async (prevState: FormState) => {
	const {projectId} = prevState.data;
	if (!projectId) {
		return prevState;
	}

	await fetchLeaveProject(projectId);
	revalidateTag(CacheTag.PROJECTS);

	return {...prevState, success: true};
};

export {leaveProject};
