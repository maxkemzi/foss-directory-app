"use server";

import {isApiError} from "#src/shared/apis/lib";
import projectRequestsApi from "#src/shared/apis/projects/requests";
import {getServerSession, logOut} from "#src/shared/auth";
import {CacheTag} from "#src/shared/constants";
import {revalidateTag} from "next/cache";

const rejectProjectRequestById = async (id: string) => {
	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	try {
		if (!id) {
			throw new Error();
		}

		await projectRequestsApi.reject(id);
		revalidateTag(CacheTag.REQUESTS);

		return {success: "Request has been rejected"};
	} catch (e) {
		const error = isApiError(e) ? e.message : "Error rejecting request";
		return {error};
	}
};

export {rejectProjectRequestById};
