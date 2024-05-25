import {getContributedProjects} from "#src/entities/project";
import {ProjectChatSidebar} from "#src/widgets/ProjectChatSidebar";

const Chats = async () => {
	const projects = await getContributedProjects();

	return (
		<div className="grid grid-cols-[200px,_1fr] grid-rows-[70vh] gap-6">
			<ProjectChatSidebar projects={projects} />
			<div>Select a chat from the sidebar.</div>
		</div>
	);
};

export default Chats;
