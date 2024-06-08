import {fetchApiWithAuth} from "#src/shared/auth";
import {CacheTag} from "#src/shared/constants";
import {
	FetchRoleRequestsResponse,
	ProjectRequestBody,
	ProjectRequestResponse
} from "./types";

const BASE_URL = "/projects/requests";

const fetchSendProjectRequest = async (
	body: ProjectRequestBody
): Promise<ProjectRequestResponse> => {
	const response = await fetchApiWithAuth(BASE_URL, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(body)
	});
	return response.json();
};

const fetchAcceptProjectRequest = async (
	id: string
): Promise<ProjectRequestResponse> => {
	const response = await fetchApiWithAuth(`${BASE_URL}/${id}/accept`, {
		method: "POST"
	});
	return response.json();
};

const fetchRejectProjectRequest = async (
	id: string
): Promise<ProjectRequestResponse> => {
	const response = await fetchApiWithAuth(`${BASE_URL}/${id}/reject`, {
		method: "DELETE"
	});
	return response.json();
};

const fetchIncomingProjectRequests =
	async (): Promise<FetchRoleRequestsResponse> => {
		const response = await fetchApiWithAuth(`${BASE_URL}/received`, {
			next: {tags: [CacheTag.REQUESTS]}
		});
		return response.json();
	};

export {
	fetchAcceptProjectRequest,
	fetchSendProjectRequest,
	fetchIncomingProjectRequests,
	fetchRejectProjectRequest
};
