"use server";

import {fetchApiWithAuth} from "#src/shared/auth";
import {withRetry} from "../actions";
import {DeleteAccountResponse} from "./types";

const BASE_URL = "/users";

const fetchApiWithAuthWithRetry = withRetry(fetchApiWithAuth);

const deleteAccount = async (): Promise<DeleteAccountResponse> => {
	const response = await fetchApiWithAuthWithRetry(BASE_URL, {
		method: "DELETE"
	});

	const data = await response.json();
	return {data};
};

export {deleteAccount};
