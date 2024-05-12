import {getServerSession, signOut} from "#src/actions/auth";
import {fetchProjectMessages} from "#src/apis/projects/messages";
import ChatContent from "../ChatContent";

const ChatsChat = async ({params}: {params: {projectId: string}}) => {
	const {projectId} = params;

	const session = await getServerSession();
	if (!session) {
		return signOut();
	}

	const messages = await fetchProjectMessages(projectId);

	return (
		<ChatContent
			projectId={projectId}
			session={session}
			initialMessages={messages.reverse()}
		/>
	);
};

export default ChatsChat;
