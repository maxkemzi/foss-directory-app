"use server";

import {
	fetchAcceptProjectRequest,
	fetchRejectProjectRequest
} from "#src/apis/projects/requests";
import {CacheTag} from "#src/constants";
import {revalidateTag} from "next/cache";

const acceptProjectRequest = async (id: string) => {
	await fetchAcceptProjectRequest(id);
	revalidateTag(CacheTag.REQUESTS);
};

const rejectProjectRequest = async (id: string) => {
	await fetchRejectProjectRequest(id);
	revalidateTag(CacheTag.REQUESTS);
};

export {acceptProjectRequest, rejectProjectRequest};
