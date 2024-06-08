import {fetchApiWithAuth} from "#src/shared/auth";
import {DeleteAccountResponse} from "./types";

const BASE_URL = "/users";

const fetchDeleteAccount = async (): Promise<DeleteAccountResponse> => {
	const response = await fetchApiWithAuth(BASE_URL, {
		method: "DELETE"
	});
	return response.json();
};

export {fetchDeleteAccount};
