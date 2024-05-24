import {FetchRolesResponse} from "./types";
import {fetchApi} from "../actions";

const BASE_URL = "/roles";

const fetchAllRoles = async (): Promise<FetchRolesResponse> => {
	const response = await fetchApi(BASE_URL);
	return response.json();
};

export {fetchAllRoles};
