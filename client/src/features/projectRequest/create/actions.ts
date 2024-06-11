"use server";

import {isApiError} from "#src/shared/apis/lib";
import projectRequestsApi from "#src/shared/apis/projects/requests";
import {getServerSession, logOut} from "#src/shared/auth";

const createProjectRequest = async (data: {
	projectId: string;
	projectRoleId: string;
}) => {
	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	try {
		await projectRequestsApi.create(data);
		return {success: "Request has been created"};
	} catch (e) {
		const error = isApiError(e) ? e.message : "Error creating request";
		return {error};
	}
};

export {createProjectRequest};
