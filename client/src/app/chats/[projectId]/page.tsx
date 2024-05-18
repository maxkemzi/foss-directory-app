import {getServerSession, logOut} from "#src/actions/auth";
import ChatHeader from "../ChatHeader";
import ChatMessages from "../ChatMessages";
import {getProjectMessages} from "./actions";

const ChatsChat = async ({params}: {params: {projectId: string}}) => {
	const {projectId} = params;

	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	const messages = await getProjectMessages(projectId);

	return (
		<div className="grid grid-rows-[auto,_1fr,_auto] gap-4">
			<ChatHeader projectId={projectId} />
			<ChatMessages
				projectId={projectId}
				session={session}
				initialMessages={messages.reverse()}
			/>
		</div>
	);
};

export default ChatsChat;
