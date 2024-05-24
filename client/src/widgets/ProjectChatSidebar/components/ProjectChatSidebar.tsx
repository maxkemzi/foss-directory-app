import {getContributedProjects} from "#src/entities/project";
import ProjectChatSidebarList from "./ProjectChatSidebarList";

const ProjectChatSidebar = async () => {
	const projects = await getContributedProjects();

	return (
		<aside>
			<ProjectChatSidebarList projects={projects} />
		</aside>
	);
};

export default ProjectChatSidebar;
