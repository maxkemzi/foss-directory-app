"use server";

import {ProjectRequestsApi} from "#src/apis";
import {CacheTag} from "#src/constants";
import {revalidateTag} from "next/cache";

const acceptRequest = async (id: number) => {
	await ProjectRequestsApi.accept(id);
	revalidateTag(CacheTag.REQUESTS);
};

const rejectRequest = async (id: number) => {
	await ProjectRequestsApi.reject(id);
	revalidateTag(CacheTag.REQUESTS);
};

export {acceptRequest, rejectRequest};
