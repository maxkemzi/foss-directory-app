import {fetchApiWithAuth} from "#src/actions/auth";
import {CacheTag} from "#src/constants";
import {
	FetchRoleRequestsResponse,
	ProjectRequestBody,
	ProjectRequestResponse
} from "#src/types/apis/projects/requests";

const BASE_URL = "/projects/requests";

const fetchCreateProjectRequest = async (
	body: ProjectRequestBody
): Promise<ProjectRequestResponse> => {
	const response = await fetchApiWithAuth(BASE_URL, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(body),
		cache: "no-store"
	});
	return response.json();
};

const fetchAcceptProjectRequest = async (
	id: string
): Promise<ProjectRequestResponse> => {
	const response = await fetchApiWithAuth(`${BASE_URL}/${id}/accept`, {
		method: "POST",
		cache: "no-store"
	});
	return response.json();
};

const fetchRejectProjectRequest = async (
	id: string
): Promise<ProjectRequestResponse> => {
	const response = await fetchApiWithAuth(`${BASE_URL}/${id}/reject`, {
		method: "POST",
		cache: "no-store"
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
	fetchProjectRequestsSentToMe,
	fetchRejectProjectRequest,
	fetchCreateProjectRequest
};
