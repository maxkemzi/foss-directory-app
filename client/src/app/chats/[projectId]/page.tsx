import {getProjectChatData} from "#src/entities/project";
import {getServerSession, logOut} from "#src/shared/auth";
import {ProjectChatBody} from "#src/widgets/ProjectChatBody";
import {ProjectChatHeader} from "#src/widgets/ProjectChatHeader";
import {ProjectChatSidebar} from "#src/widgets/ProjectChatSidebar";

const ChatsChat = async ({params}: {params: {projectId: string}}) => {
	const {projectId} = params;

	const session = await getServerSession();
	if (!session) {
		return logOut();
	}

	const [project, messages] = await getProjectChatData(projectId);

	return (
		<div className="grid grid-cols-[200px,_1fr] grid-rows-[70vh] gap-6">
			<ProjectChatSidebar />
			<div className="grid grid-rows-[auto,_1fr,_auto] gap-4">
				<ProjectChatHeader project={project} />
				<ProjectChatBody
					projectId={projectId}
					session={session}
					initialMessages={messages.reverse()}
				/>
			</div>
		</div>
	);
};

export default ChatsChat;
