"use server";

import {FetchRolesResponse, FetchRolesSearchParams} from "./types";
import {fetchApi} from "../actions";
import {ApiHeader} from "../constants";
import {parseNumericHeader} from "../helpers";

const BASE_URL = "/roles";

const fetchAll = async (
	params?: FetchRolesSearchParams
): Promise<FetchRolesResponse> => {
	const response = await fetchApi(BASE_URL, {params});

	const data = await response.json();

	const {headers} = response;
	const totalCount = headers.get(ApiHeader.TOTAL_COUNT);
	const page = headers.get(ApiHeader.PAGE);
	const totalPages = headers.get(ApiHeader.TOTAL_PAGES);

	return {
		data,
		totalCount: parseNumericHeader(totalCount),
		page: parseNumericHeader(page),
		totalPages: parseNumericHeader(totalPages)
	};
};

export {fetchAll};
