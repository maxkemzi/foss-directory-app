"use server";

import {isApiError} from "#src/shared/apis/lib";
import projectRequestsApi from "#src/shared/apis/projects/requests";
import {CacheTag} from "#src/shared/constants";
import {AppError} from "#src/shared/error";
import {getErrorMessage} from "#src/shared/helpers";
import {SafeAction} from "#src/shared/hooks";
import {revalidateTag} from "next/cache";

const rejectProjectRequestById = async (id: string) => {
	try {
		await projectRequestsApi.reject(id);
		revalidateTag(CacheTag.REQUESTS);
	} catch (e) {
		const message = isApiError(e) ? e.message : "Error rejecting the request";
		throw new AppError(message);
	}
};

const safeRejectProjectRequestById: SafeAction<
	typeof rejectProjectRequestById
> = async id => {
	try {
		await rejectProjectRequestById(id);

		return {success: "The request has been rejected"};
	} catch (e) {
		return {error: getErrorMessage(e)};
	}
};

export {rejectProjectRequestById, safeRejectProjectRequestById};
