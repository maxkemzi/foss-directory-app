import {fetchApiWithAuth} from "#src/actions/auth";
import {DeleteAccountResponse} from "#src/types/apis/users/accounts";

const BASE_URL = "/users/accounts";

const fetchDeleteAccount = async (): Promise<DeleteAccountResponse> => {
	const response = await fetchApiWithAuth(BASE_URL, {
		method: "DELETE"
	});
	return response.json();
};

export {fetchDeleteAccount};
