import {CacheTag} from "#src/constants";
import {
	FetchRoleRequestsResponse,
	RequestRoleBody,
	RequestRoleResponse
} from "#src/types/apis/projects/requests";
import ApiFetcher from "../../lib/ApiFetcher";

class ProjectRequestsApi {
	private static fetcher = new ApiFetcher("/projects/requests");

	static async request(body: RequestRoleBody): Promise<RequestRoleResponse> {
		const response = await this.fetcher.fetchWithAuth("/", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(body),
			cache: "no-store"
		});
		return response.json();
	}

	static async fetchAll(): Promise<FetchRoleRequestsResponse> {
		const response = await this.fetcher.fetchWithAuth("/", {
			next: {tags: [CacheTag.REQUESTS]}
		});
		return response.json();
	}

	static async accept(id: number): Promise<RequestRoleResponse> {
		const response = await this.fetcher.fetchWithAuth(`/${id}/accept`, {
			method: "POST",
			cache: "no-store"
		});
		return response.json();
	}

	static async reject(id: number): Promise<RequestRoleResponse> {
		const response = await this.fetcher.fetchWithAuth(`/${id}/reject`, {
			method: "POST",
			cache: "no-store"
		});
		return response.json();
	}
}

export default ProjectRequestsApi;
