"use server";

import {isApiError} from "#src/shared/apis/lib";
import projectRequestsApi from "#src/shared/apis/projects/requests";
import {getServerSession, logOut} from "#src/shared/auth";

const getReceivedProjectRequests = async () => {
	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	try {
		const response = await projectRequestsApi.fetchIncoming();
		return response;
	} catch (e) {
		throw new Error(isApiError(e) ? e.message : "Error fetching requests");
	}
};

export {getReceivedProjectRequests};
