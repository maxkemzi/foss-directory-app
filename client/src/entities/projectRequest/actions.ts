"use server";

import {isApiError} from "#src/shared/api/lib";
import {fetchReceivedProjectRequests} from "#src/shared/api/projects/requests";
import {getServerSession, logOut} from "#src/shared/auth";

const getReceivedProjectRequests = async () => {
	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	try {
		const requests = await fetchReceivedProjectRequests();
		return requests;
	} catch (e) {
		throw new Error(isApiError(e) ? e.message : "Error fetching requests");
	}
};

export {getReceivedProjectRequests};
