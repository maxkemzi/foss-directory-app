import {FetchTagsResponse} from "./types";
import ApiFetcher from "../../ApiFetcher";

class TagsApi {
	private static fetcher = new ApiFetcher("/projects/tags");

	static async fetchAll(): Promise<FetchTagsResponse> {
		const response = await this.fetcher.fetch("/");
		return response.json();
	}
}

export default TagsApi;
