import {
	getContributedProjects,
	getProjectById,
	getProjectMessages
} from "#src/entities/project";
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

	const [projects, project, messages] = await Promise.all([
		getContributedProjects(),
		getProjectById(projectId),
		getProjectMessages(projectId)
	]);

	return (
		<ProjectChat
			sidebarSlot={<ProjectChatSidebar projects={projects} />}
			headerSlot={
				<ProjectChatHeader
					name={project.name}
					contributorCount={project.contributorCount}
					rightSlot={<ProjectChatActionsDropdown projectId={project.id} />}
					clickAreaSlot={<ShowProjectInfoClickArea projectId={project.id} />}
				/>
			}
			bodySlot={
				<ProjectChatBody
					initialMessages={messages}
					projectId={project.id}
					session={session}
				/>
			}
		/>
	);
};

export default ChatsChat;
