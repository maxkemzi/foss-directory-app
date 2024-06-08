import {fetchApiWithAuth} from "#src/shared/auth";
import {FetchChatResponse, FetchChatsResponse} from "./types";

const BASE_URL = "/projects";

const fetchProjectChats = async (
	options: RequestInit = {}
): Promise<FetchChatsResponse> => {
	const response = await fetchApiWithAuth(`${BASE_URL}/chats`, options);
	return response.json();
};

const fetchProjectChat = async (
	projectId: string,
	options: RequestInit = {}
): Promise<FetchChatResponse> => {
	const response = await fetchApiWithAuth(
		`${BASE_URL}/${projectId}/chat`,
		options
	);
	return response.json();
};

export {fetchProjectChat, fetchProjectChats};
