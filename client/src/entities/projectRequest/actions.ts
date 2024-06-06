"use server";

import {isApiError} from "#src/shared/api/lib";
import {fetchIncomingProjectRequests} from "#src/shared/api/projects/requests";
import {getServerSession, logOut} from "#src/shared/auth";

const getIncomingProjectRequests = async () => {
	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	try {
		const requests = await fetchIncomingProjectRequests();
		return requests;
	} catch (e) {
		throw new Error(
			isApiError(e) ? e.message : "Error fetching project requests"
		);
	}
};

export {getIncomingProjectRequests};
