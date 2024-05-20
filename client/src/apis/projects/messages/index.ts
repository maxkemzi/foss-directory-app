import {fetchApiWithAuth} from "#src/actions/auth";
import {FetchProjectMessagesResponse} from "#src/types/apis/projects/messages";

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
