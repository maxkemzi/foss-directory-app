"use server";

import {isApiError} from "#src/shared/apis/lib";
import rolesApi, {FetchRolesSearchParams} from "#src/shared/apis/roles";
import {AppError} from "#src/shared/error";
import {getErrorMessage} from "#src/shared/helpers";

const getAll = async (params?: FetchRolesSearchParams) => {
	try {
		const response = await rolesApi.fetchAll(params);
		return response;
	} catch (e) {
		console.log(e);
		const message = isApiError(e) ? e.message : "Error fetching roles";
		throw new AppError(message);
	}
};

const getAllSafe = async (params?: FetchRolesSearchParams) => {
	try {
		const response = await getAll(params);
		return {success: "Roles has been fetched", response};
	} catch (e) {
		return {error: getErrorMessage(e)};
	}
};

export {getAll, getAllSafe};
