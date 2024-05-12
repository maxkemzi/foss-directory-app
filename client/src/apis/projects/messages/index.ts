import {fetchApiWithAuth} from "#src/actions/auth";
import {FetchProjectMessagesResponse} from "#src/types/apis/projects/messages";

const BASE_URL = "/projects";

const fetchProjectMessages = async (
	projectId: string
): Promise<FetchProjectMessagesResponse> => {
	const response = await fetchApiWithAuth(`${BASE_URL}/${projectId}/messages`, {
		cache: "no-store"
	});
	return response.json();
};

export {fetchProjectMessages};
