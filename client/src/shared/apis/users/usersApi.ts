"use server";

import {fetchApi, withAuth, withRetry} from "../actions";
import {DeleteAccountResponse} from "./types";

const fetchApiWithRetryAndAuth = withRetry(withAuth(fetchApi));

const BASE_URL = "/users";

const deleteAccount = async (): Promise<DeleteAccountResponse> => {
	const response = await fetchApiWithRetryAndAuth(BASE_URL, {
		method: "DELETE"
	});

	const data = await response.json();
	return {data};
};

export {deleteAccount};
