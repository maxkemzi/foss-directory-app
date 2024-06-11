import {getProjectsByMembership, getProjectById} from "#src/entities/project";
import {getProjectMessagesByProjectId} from "#src/entities/projectMessage";
import {getServerSession, logOut} from "#src/shared/auth";
import Chat from "./Chat";

const ChatsChat = async ({params}: {params: {projectId: string}}) => {
	const {projectId} = params;

	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	const [{data: projects}, {data: project}, {data: messages}] =
		await Promise.all([
			getProjectsByMembership(),
			getProjectById(projectId),
			getProjectMessagesByProjectId(projectId)
		]);

	return (
		<Chat
			projects={projects}
			project={project}
			initialMessages={messages.reverse()}
			session={session}
		/>
	);
};

export default ChatsChat;
