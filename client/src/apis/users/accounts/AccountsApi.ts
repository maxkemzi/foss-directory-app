import {DeleteAccountResponse} from "./types";
import ApiFetcher from "../../ApiFetcher";

class AccountsApi {
	private static fetcher = new ApiFetcher("/users/accounts");

	static async delete(): Promise<DeleteAccountResponse> {
		const response = await this.fetcher.fetchWithAuth("/", {
			method: "DELETE",
			cache: "no-store"
		});
		return response.json();
	}
}

export default AccountsApi;
