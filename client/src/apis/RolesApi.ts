import {FetchRolesResponse} from "#src/types/apis/roles";
import ApiFetcher from "./lib/ApiFetcher";

class RolesApi {
	private static fetcher = new ApiFetcher("/roles");

	static async fetchAll(): Promise<FetchRolesResponse> {
		const response = await this.fetcher.fetch("/");
		return response.json();
	}
}

export default RolesApi;
