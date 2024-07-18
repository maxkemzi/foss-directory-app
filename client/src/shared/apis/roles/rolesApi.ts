"use server";

import {fetchApi, withAuth} from "../actions";
import {calcHasMore, getPaginationHeaderValues} from "../helpers";
import {FetchRolesResponse, FetchRolesSearchParams} from "./types";

const fetchApiWithAuth = withAuth(fetchApi);

const BASE_URL = "/roles";

const fetchAll = async (
	params?: FetchRolesSearchParams
): Promise<FetchRolesResponse> => {
	const response = await fetchApiWithAuth(BASE_URL, {params});

	const data = await response.json();

	const {headers} = response;
	const {totalCount, page, limit, totalPages} =
		getPaginationHeaderValues(headers);

	return {
		data,
		totalCount,
		page,
		limit,
		hasMore: calcHasMore(page, totalPages)
	};
};

export {fetchAll};
