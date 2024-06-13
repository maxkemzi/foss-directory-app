"use server";

import {fetchApiWithAuth} from "#src/shared/auth";
import {CacheTag} from "#src/shared/constants";
import {getPaginationHeaderValues} from "../../helpers";
import {
	AcceptProjectRequestResponse,
	CreateProjectRequestBody,
	CreateProjectRequestResponse,
	FetchProjectRequestsResponse,
	RejectProjectRequestResponse
} from "./types";

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

const fetchIncoming = async (): Promise<FetchProjectRequestsResponse> => {
	const response = await fetchApiWithAuth(`${BASE_URL}/received`, {
		next: {tags: [CacheTag.REQUESTS]}
	});

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

export {accept, create, fetchIncoming, reject};
