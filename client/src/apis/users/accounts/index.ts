import {fetchApiWithAuth} from "#src/actions/auth";
import {DeleteAccountResponse} from "#src/types/apis/users/accounts";

const BASE_URL = "/users/accounts";

const deleteMyUserAccount = async (): Promise<DeleteAccountResponse> => {
	const response = await fetchApiWithAuth(BASE_URL, {
		method: "DELETE",
		cache: "no-store"
	});
	return response.json();
};

export {deleteMyUserAccount};
