import {fetchApiWithAuth} from "#src/shared/auth";
import {CacheTag} from "#src/shared/constants";
import {
	FetchRoleRequestsResponse,
	ProjectRequestBody,
	ProjectRequestResponse
} from "./types";

const BASE_URL = "/projects/requests";

const fetchCreateProjectRequest = async (
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
		method: "POST"
	});
	return response.json();
};

const fetchProjectRequestsSentToMe =
	async (): Promise<FetchRoleRequestsResponse> => {
		const response = await fetchApiWithAuth(BASE_URL, {
			next: {tags: [CacheTag.REQUESTS]}
		});
		return response.json();
	};

export {
	fetchAcceptProjectRequest,
	fetchCreateProjectRequest,
	fetchProjectRequestsSentToMe,
	fetchRejectProjectRequest
};
