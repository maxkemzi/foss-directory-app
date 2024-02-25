import ApiFetcher from "../ApiFetcher";
import {
	CreateProjectBody,
	CreateProjectResponse,
	FetchProjectsResponse
} from "../types";

class ProjectsApi {
	private static fetcher = new ApiFetcher("/projects");

	static async fetchAll(): Promise<FetchProjectsResponse> {
		const response = await this.fetcher.fetch("/");
		return response.json();
	}

	static async create(
		body: CreateProjectBody
	): Promise<CreateProjectResponse> {
		const response = await this.fetcher.fetchWithAuth("/", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(body),
			cache: "no-store"
		});
		return response.json();
	}
}

export default ProjectsApi;
