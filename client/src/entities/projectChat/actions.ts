import {
	fetchProjectChat,
	fetchProjectChats
} from "#src/shared/api/projects/chats";
import {getServerSession, logOut} from "#src/shared/auth";

const getProjectChats = async () => {
	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	try {
		const projects = await fetchProjectChats();
		return projects;
	} catch (e) {
		throw new Error("Error fetching project chats");
	}
};

const getProjectChat = async (projectId: string) => {
	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	try {
		const project = await fetchProjectChat(projectId);
		return project;
	} catch (e) {
		throw new Error("Error fetching project chat");
	}
};

export {getProjectChats, getProjectChat};
