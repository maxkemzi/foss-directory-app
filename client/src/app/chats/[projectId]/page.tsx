import {
	getContributedProjects,
	getProjectById,
	getProjectMessages
} from "#src/entities/project";
import {getServerSession, logOut} from "#src/shared/auth";
import Content from "./Content";

const ChatsChat = async ({params}: {params: {projectId: string}}) => {
	const {projectId} = params;

	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	const [projects, project, messages] = await Promise.all([
		getContributedProjects(),
		getProjectById(projectId),
		getProjectMessages(projectId)
	]);

	return (
		<Content
			projects={projects}
			project={project}
			messages={messages.reverse()}
			session={session}
		/>
	);
};

export default ChatsChat;
