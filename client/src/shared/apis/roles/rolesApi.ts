"use server";

import {fetchApi} from "../actions";
import {getPaginationHeaderValues} from "../helpers";
import {FetchRolesResponse, FetchRolesSearchParams} from "./types";

const BASE_URL = "/roles";

const fetchAll = async (
	params?: FetchRolesSearchParams
): Promise<FetchRolesResponse> => {
	const response = await fetchApi(BASE_URL, {params});

	const data = await response.json();

	const {headers} = response;
	const {totalCount, page, totalPages} = getPaginationHeaderValues(headers);

	return {
		data,
		totalCount,
		page,
		totalPages
	};
};

export {fetchAll};
