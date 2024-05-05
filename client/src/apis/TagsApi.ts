import {FetchTagsResponse} from "#src/types/apis/tags";
import ApiFetcher from "./lib/ApiFetcher";

class TagsApi {
	private static fetcher = new ApiFetcher("/tags");

	static async fetchAll(): Promise<FetchTagsResponse> {
		const response = await this.fetcher.fetch("/");
		return response.json();
	}
}

export default TagsApi;
