"use server";

import {fetchApiWithAuth} from "#src/shared/auth";
import {DeleteAccountResponse} from "./types";

const BASE_URL = "/users";

const deleteAccount = async (): Promise<DeleteAccountResponse> => {
	const response = await fetchApiWithAuth(BASE_URL, {
		method: "DELETE"
	});

	const data = await response.json();
	return {data};
};

export {deleteAccount};
