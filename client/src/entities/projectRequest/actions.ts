"use server";

import {isApiError} from "#src/shared/api/lib";
import {
	fetchAcceptProjectRequest,
	fetchProjectRequestsSentToMe,
	fetchRejectProjectRequest
} from "#src/shared/api/projects/requests";
import {getServerSession, logOut} from "#src/shared/auth";
import {CacheTag} from "#src/shared/constants";
import {revalidateTag} from "next/cache";

const getProjectRequestsSentToMe = async () => {
	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	try {
		const requests = await fetchProjectRequestsSentToMe();
		return requests;
	} catch (e) {
		throw new Error(
			isApiError(e) ? e.message : "Error fetching project requests."
		);
	}
};

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
			isApiError(e) ? e.message : "Error acceping project request."
		);
	}
};

const rejectProjectRequest = async (id: string) => {
	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	try {
		await fetchRejectProjectRequest(id);
		return revalidateTag(CacheTag.REQUESTS);
	} catch (e) {
		throw new Error(
			isApiError(e) ? e.message : "Error rejecting project request."
		);
	}
};

export {acceptProjectRequest, getProjectRequestsSentToMe, rejectProjectRequest};
