"use server";

import {isApiError} from "#src/shared/api/lib";
import {fetchAcceptProjectRequest} from "#src/shared/api/projects/requests";
import {getServerSession, logOut} from "#src/shared/auth";
import {CacheTag} from "#src/shared/constants";
import {revalidateTag} from "next/cache";
import {FormFields} from "./types";

const acceptProjectRequest = async ({
	projectRequestId
}: Partial<FormFields>) => {
	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	try {
		if (!projectRequestId) {
			throw new Error();
		}

		await fetchAcceptProjectRequest(projectRequestId);
		return revalidateTag(CacheTag.REQUESTS);
	} catch (e) {
		throw new Error(
			isApiError(e) ? e.message : "Error acceping project request"
		);
	}
};

export {acceptProjectRequest};
