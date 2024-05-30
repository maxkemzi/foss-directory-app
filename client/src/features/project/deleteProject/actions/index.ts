"use server";

import {fetchDeleteProjectById} from "#src/shared/api/projects";
import {FormFields} from "../types";

const deleteProject = async ({projectId}: FormFields) => {
	await fetchDeleteProjectById(projectId);
};

export {deleteProject};
