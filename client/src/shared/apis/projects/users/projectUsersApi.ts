"use server";

import {fetchApi, withAuth} from "../../actions";
import {calcHasMore, getPaginationHeaderValues} from "../../helpers";
import {
	FetchProjectUsersResponse,
	FetchProjectUsersSearchParams
} from "./types";

const fetchApiWithAuth = withAuth(fetchApi);

const BASE_URL = "/projects";

const fetchByProjectId = async (
	id: string,
	params?: FetchProjectUsersSearchParams
): Promise<FetchProjectUsersResponse> => {
	const response = await fetchApiWithAuth(`${BASE_URL}/${id}/users`, {params});

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

export {fetchByProjectId};
