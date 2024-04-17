import {FetchReposResponse, FetchUrlResponse} from "#src/types/api";
import ApiFetcher from "../../ApiFetcher";

class GithubApi {
	private static fetcher = new ApiFetcher("/integrations/github");

	static async fetchConnectionUrl(): Promise<FetchUrlResponse> {
		const response = await this.fetcher.fetchWithAuth("/", {
			cache: "no-store"
		});
		return response.json();
	}

	static async fetchRepos(): Promise<FetchReposResponse> {
		const response = await this.fetcher.fetchWithAuth("/repos");
		return response.json();
	}
}

export default GithubApi;
