import {CacheTag} from "#src/constants";
import {
	CreateProjectBody,
	CreateProjectResponse,
	FetchProjectsResponse
} from "#src/types/apis/projects";
import ApiFetcher from "../lib/ApiFetcher";

class ProjectsApi {
	private static fetcher = new ApiFetcher("/projects");

	static async fetchAll(): Promise<FetchProjectsResponse> {
		const response = await this.fetcher.fetch("/", {
			next: {tags: [CacheTag.PROJECTS]}
		});
		return response.json();
	}

	static async fetchAllAuth(): Promise<FetchProjectsResponse> {
		const response = await this.fetcher.fetchWithAuth("/auth", {
			next: {tags: [CacheTag.PROJECTS]}
		});
		return response.json();
	}

	static async create(body: CreateProjectBody): Promise<CreateProjectResponse> {
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
