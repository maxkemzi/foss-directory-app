import {fetchApiWithAuth} from "#src/shared/auth";
import {FetchProjectMessagesResponse} from "./types";

const BASE_URL = "/projects";

const fetchProjectMessages = async (
	projectId: string,
	options: RequestInit = {}
): Promise<FetchProjectMessagesResponse> => {
	const response = await fetchApiWithAuth(
		`${BASE_URL}/${projectId}/messages`,
		options
	);
	return response.json();
};

export {fetchProjectMessages};
