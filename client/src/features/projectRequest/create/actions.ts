"use server";

import {isApiError} from "#src/shared/api/lib";
import {fetchCreateProjectRequest} from "#src/shared/api/projects/requests";
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
		await fetchCreateProjectRequest(data);
		return {success: "Request has been created"};
	} catch (e) {
		const error = isApiError(e) ? e.message : "Error creating request";
		return {error};
	}
};

export {createProjectRequest};
