"use server";

import {CacheTag} from "#src/shared/constants";
import {withAuth, fetchApi} from "../../actions";
import {calcHasMore, getPaginationHeaderValues} from "../../helpers";
import {
	AcceptProjectRequestResponse,
	CreateProjectRequestBody,
	CreateProjectRequestResponse,
	FetchProjectRequestsResponse,
	FetchProjectRequestsSearchParams,
	RejectProjectRequestResponse
} from "./types";

const fetchApiWithAuth = withAuth(fetchApi);

const BASE_URL = "/projects/requests";

const create = async (
	body: CreateProjectRequestBody
): Promise<CreateProjectRequestResponse> => {
	const response = await fetchApiWithAuth(BASE_URL, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(body)
	});
	return response.json();
};

const accept = async (id: string): Promise<AcceptProjectRequestResponse> => {
	const response = await fetchApiWithAuth(`${BASE_URL}/${id}/accept`, {
		method: "POST"
	});
	return response.json();
};

const reject = async (id: string): Promise<RejectProjectRequestResponse> => {
	const response = await fetchApiWithAuth(`${BASE_URL}/${id}/reject`, {
		method: "DELETE"
	});
	return response.json();
};

const fetchIncoming = async (
	params?: FetchProjectRequestsSearchParams
): Promise<FetchProjectRequestsResponse> => {
	const response = await fetchApiWithAuth(`${BASE_URL}/received`, {
		next: {tags: [CacheTag.REQUESTS]},
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

export {accept, create, fetchIncoming, reject};
