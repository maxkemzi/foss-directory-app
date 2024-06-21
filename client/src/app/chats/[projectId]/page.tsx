import {projectActions} from "#src/entities/project";
import {projectMessageActions} from "#src/entities/projectMessage";
import {getServerSession, logOut} from "#src/shared/auth";
import Chat from "./Chat";

const PROJECTS_LIMIT = 10;
const MESSAGES_LIMIT = 20;

const ChatsChat = async ({params}: {params: {projectId: string}}) => {
	const {projectId} = params;

	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	const [projectsResponse, messagesResponse, projectResponse] =
		await Promise.all([
			projectActions.getByVariant("member", {limit: PROJECTS_LIMIT}),
			projectMessageActions.getByProjectId(projectId, {
				limit: MESSAGES_LIMIT
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
