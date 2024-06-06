"use server";

import {fetchSendProjectRequest} from "#src/shared/api/projects/requests";
import {FormFields} from "./types";

const sendProjectRequest = async (data: FormFields) => {
	await fetchSendProjectRequest(data);
};

export {sendProjectRequest};
