"use server";

import {fetchApi} from "../actions";
import {calcHasMore, getPaginationHeaderValues} from "../helpers";
import {FetchTagsResponse, FetchTagsSearchParams} from "./types";

const BASE_URL = "/tags";

const fetchAll = async (
	params?: FetchTagsSearchParams
): Promise<FetchTagsResponse> => {
	const response = await fetchApi(BASE_URL, {params});

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
