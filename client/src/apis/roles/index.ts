import {FetchRolesResponse} from "#src/types/apis/roles";
import {fetchApi} from "#src/actions/api";

const BASE_URL = "/roles";

const fetchAllRoles = async (): Promise<FetchRolesResponse> => {
	const response = await fetchApi(BASE_URL);
	return response.json();
};

export {fetchAllRoles};
