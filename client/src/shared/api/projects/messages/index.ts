import {fetchApiWithAuth} from "#src/shared/auth";
import {FetchMessagesResponse} from "./types";

const BASE_URL = "/projects";

const fetchProjectMessagesByProjectId = async (
	id: string,
	options: RequestInit = {}
): Promise<FetchMessagesResponse> => {
	const response = await fetchApiWithAuth(
		`${BASE_URL}/${id}/messages`,
		options
	);
	return response.json();
};

export {fetchProjectMessagesByProjectId};
