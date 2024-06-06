import {fetchApiWithAuth} from "#src/shared/auth";
import {FetchChatResponse, FetchChatsResponse} from "./types";

const BASE_URL = "/projects/chats";

const fetchProjectChats = async (
	options: RequestInit = {}
): Promise<FetchChatsResponse> => {
	const response = await fetchApiWithAuth(BASE_URL, options);
	return response.json();
};

const fetchProjectChat = async (
	projectId: string,
	options: RequestInit = {}
): Promise<FetchChatResponse> => {
	const response = await fetchApiWithAuth(`${BASE_URL}/${projectId}`, options);
	return response.json();
};

export {fetchProjectChat, fetchProjectChats};
