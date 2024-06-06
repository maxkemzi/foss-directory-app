import {fetchApiWithAuth} from "#src/shared/auth";
import {FetchChatMessagesResponse} from "./types";

const BASE_URL = "/projects/chats";

const fetchProjectChatMessages = async (
	projectId: string,
	options: RequestInit = {}
): Promise<FetchChatMessagesResponse> => {
	const response = await fetchApiWithAuth(
		`${BASE_URL}/${projectId}/messages`,
		options
	);
	return response.json();
};

export {fetchProjectChatMessages};
