import {fetchApiWithAuth} from "#src/shared/auth";
import {FetchProjectUsersResponse} from "./types";

const BASE_URL = "/projects";

const fetchProjectUsersByProjectId = async (
	id: string
): Promise<FetchProjectUsersResponse> => {
	const response = await fetchApiWithAuth(`${BASE_URL}/${id}/users`);
	return response.json();
};

export {fetchProjectUsersByProjectId};
