"use server";

import {fetchLeaveProject} from "#src/shared/api/projects/users";
import {FormFields} from "./types";

const leaveProject = async ({projectId}: FormFields) => {
	await fetchLeaveProject(projectId);
};

export {leaveProject};
