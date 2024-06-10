"use server";

import {isApiError} from "#src/shared/api/lib";
import {fetchAcceptProjectRequest} from "#src/shared/api/projects/requests";
import {getServerSession, logOut} from "#src/shared/auth";
import {CacheTag} from "#src/shared/constants";
import {revalidateTag} from "next/cache";

const acceptProjectRequestById = async (id: string) => {
	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	try {
		if (!id) {
			throw new Error();
		}

		await fetchAcceptProjectRequest(id);
		revalidateTag(CacheTag.REQUESTS);

		return {success: "Request has been accepted"};
	} catch (e) {
		const error = isApiError(e) ? e.message : "Error acceping request";
		return {error};
	}
};

export {acceptProjectRequestById};
