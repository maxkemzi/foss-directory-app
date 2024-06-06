"use server";

import {fetchProjectChatMessages} from "#src/shared/api/projects/chats/messages";
import {getServerSession, logOut} from "#src/shared/auth";

const getProjectChatMessages = async (projectId: string) => {
	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	try {
		const messages = await fetchProjectChatMessages(projectId);
		return messages;
	} catch (e) {
		throw new Error("Error fetching project chat messages");
	}
};

export {getProjectChatMessages};
