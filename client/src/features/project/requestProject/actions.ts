"use server";

import {fetchCreateProjectRequest} from "#src/shared/api/projects/requests";
import {FormFields} from "./types";

const createProjectRequest = async (data: FormFields) => {
	await fetchCreateProjectRequest(data);
};

export {createProjectRequest};
