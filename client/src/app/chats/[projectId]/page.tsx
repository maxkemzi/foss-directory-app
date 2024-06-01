import {
	getContributedProjects,
	getProjectById,
	getProjectMessages
} from "#src/entities/project";
import {formatProjectMessageCreatedAt} from "#src/entities/projectMessage";
import {ShowProjectInfoClickArea} from "#src/features/project/showProjectInfo";
import {getServerSession, logOut} from "#src/shared/auth";
import {ProjectChat} from "#src/widgets/ProjectChat";
import {ProjectChatActionsDropdown} from "#src/widgets/ProjectChatActionsDropdown";
import {ProjectChatBody} from "#src/widgets/ProjectChatBody";
import {ProjectChatHeader} from "#src/widgets/ProjectChatHeader";
import {ProjectChatSidebar} from "#src/widgets/ProjectChatSidebar";

const ChatsChat = async ({params}: {params: {projectId: string}}) => {
	const {projectId} = params;

	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	let [projects, project, messages] = await Promise.all([
		getContributedProjects(),
		getProjectById(projectId),
		getProjectMessages(projectId)
	]);

	// Format createdAt date on the server to prevent hydration errors
	messages = messages.map(m => ({
		...m,
		createdAt: formatProjectMessageCreatedAt(m.createdAt)
	}));

	return (
		<ProjectChat
			sidebarSlot={<ProjectChatSidebar projects={projects} />}
			headerSlot={
				<ProjectChatHeader
					name={project.name}
					contributorCount={project.contributorCount}
					rightSlot={
						session.user.id !== project.owner.id ? (
							<ProjectChatActionsDropdown projectId={project.id} />
						) : null
					}
					clickAreaSlot={<ShowProjectInfoClickArea projectId={project.id} />}
				/>
			}
			bodySlot={
				<ProjectChatBody
					initialMessages={messages.reverse()}
					projectId={project.id}
					session={session}
				/>
			}
		/>
	);
};

export default ChatsChat;
