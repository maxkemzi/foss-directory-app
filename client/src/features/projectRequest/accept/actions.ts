"use server";

import {isApiError} from "#src/shared/apis/lib";
import projectRequestsApi from "#src/shared/apis/projects/requests";
import {CacheTag} from "#src/shared/constants";
import {AppError} from "#src/shared/error";
import {getErrorMessage} from "#src/shared/helpers";
import {SafeAction} from "#src/shared/hooks";
import {revalidateTag} from "next/cache";

const acceptProjectRequestById = async (id: string) => {
	try {
		await projectRequestsApi.accept(id);
		revalidateTag(CacheTag.REQUESTS);
	} catch (e) {
		const message = isApiError(e) ? e.message : "Error acceping the request";
		throw new AppError(message);
	}
};

const safeAcceptProjectRequestById: SafeAction<
	typeof acceptProjectRequestById
> = async (id: string) => {
	try {
		await acceptProjectRequestById(id);

		return {success: "The request has been accepted"};
	} catch (e) {
		return {error: getErrorMessage(e)};
	}
};

export {acceptProjectRequestById, safeAcceptProjectRequestById};
