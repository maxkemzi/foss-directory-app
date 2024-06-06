"use server";

import {isApiError} from "#src/shared/api/lib";
import {fetchAcceptProjectRequest} from "#src/shared/api/projects/requests";
import {getServerSession, logOut} from "#src/shared/auth";
import {CacheTag} from "#src/shared/constants";
import {revalidateTag} from "next/cache";

const acceptProjectRequest = async (id: string) => {
	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	try {
		await fetchAcceptProjectRequest(id);
		return revalidateTag(CacheTag.REQUESTS);
	} catch (e) {
		throw new Error(
			isApiError(e) ? e.message : "Error acceping project request"
		);
	}
};

export {acceptProjectRequest};
