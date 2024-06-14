"use server";

import {fetchApiWithAuth} from "#src/shared/auth";
import {calcHasMore, getPaginationHeaderValues} from "../../helpers";
import {
	FetchProjectMessagesResponse,
	FetchProjectMessagesSearchParams
} from "./types";

const BASE_URL = "/projects";

const fetchByProjectId = async (
	id: string,
	params?: FetchProjectMessagesSearchParams
): Promise<FetchProjectMessagesResponse> => {
	const response = await fetchApiWithAuth(`${BASE_URL}/${id}/messages`, {
		params
	});

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
