"use server";

import {fetchApi, withAuth} from "../../actions";
import {calcHasMore, getPaginationHeaderValues} from "../../helpers";
import {
	FetchConnectionUrlResponse,
	FetchReposResponse,
	FetchReposSearchParams
} from "./types";

const fetchApiWithAuth = withAuth(fetchApi);

const BASE_URL = "/integrations/github";

const fetchConnectionUrl = async (): Promise<FetchConnectionUrlResponse> => {
	const response = await fetchApiWithAuth(BASE_URL);

	const data = await response.json();
	return {data};
};

const fetchRepos = async (
	params?: FetchReposSearchParams
): Promise<FetchReposResponse> => {
	const response = await fetchApiWithAuth(`${BASE_URL}/repos`, {params});

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

export {fetchConnectionUrl, fetchRepos};
