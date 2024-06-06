import {getProjectChat, getProjectChats} from "#src/entities/projectChat";
import {getProjectChatMessages} from "#src/entities/projectChatMessage";
import {getServerSession, logOut} from "#src/shared/auth";
import Chat from "./Chat";

const ChatsChat = async ({params}: {params: {projectId: string}}) => {
	const {projectId} = params;

	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	const [chats, chat, messages] = await Promise.all([
		getProjectChats(),
		getProjectChat(projectId),
		getProjectChatMessages(projectId)
	]);

	return (
		<Chat
			chats={chats}
			chat={chat}
			initialMessages={messages.reverse()}
			session={session}
		/>
	);
};

export default ChatsChat;
