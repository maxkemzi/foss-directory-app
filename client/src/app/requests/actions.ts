"use server";

import {
	acceptProjectRequest,
	rejectProjectRequest
} from "#src/apis/projects/requests";
import {CacheTag} from "#src/constants";
import {revalidateTag} from "next/cache";

const acceptRequest = async (id: string) => {
	await acceptProjectRequest(id);
	revalidateTag(CacheTag.REQUESTS);
};

const rejectRequest = async (id: string) => {
	await rejectProjectRequest(id);
	revalidateTag(CacheTag.REQUESTS);
};

export {acceptRequest, rejectRequest};
