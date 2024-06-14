import {projectActions} from "#src/entities/project";
import {projectMessageActions} from "#src/entities/projectMessage";
import {getServerSession, logOut} from "#src/shared/auth";
import Chat from "./Chat";
import {FETCH_MESSAGES_LIMIT, FETCH_PROJECTS_LIMIT} from "./constants";

const ChatsChat = async ({params}: {params: {projectId: string}}) => {
	const {projectId} = params;

	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	const [projectsResponse, messagesResponse, projectResponse] =
		await Promise.all([
			projectActions.getByMembership({limit: FETCH_PROJECTS_LIMIT}),
			projectMessageActions.getByProjectId(projectId, {
				limit: FETCH_MESSAGES_LIMIT
			}),
			projectActions.getById(projectId)
		]);

	return (
		<Chat
			projectId={projectId}
			projectsResponse={projectsResponse}
			messagesResponse={messagesResponse}
			projectResponse={projectResponse}
			session={session}
		/>
	);
};

export default ChatsChat;
