import ApiFetcher from "../../ApiFetcher";
import {FetchTagsResponse} from "../../types";

class TagsApi {
	private static fetcher = new ApiFetcher("/projects/tags");

	static async fetchAll(): Promise<FetchTagsResponse> {
		const response = await this.fetcher.fetch("/");
		return response.json();
	}
}

export default TagsApi;
