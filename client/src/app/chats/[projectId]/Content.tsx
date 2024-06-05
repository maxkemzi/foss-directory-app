"use client";

import {ShowProjectInfoClickArea} from "#src/features/project/showProjectInfo";
import {ProjectFromApi, ProjectMessageFromApi} from "#src/shared/api";
import {Session} from "#src/shared/auth";
import {ProjectChat} from "#src/widgets/ProjectChat";
import {ProjectChatActionsDropdown} from "#src/widgets/ProjectChatActionsDropdown";
import {ProjectChatBody} from "#src/widgets/ProjectChatBody";
import {ProjectChatHeader} from "#src/widgets/ProjectChatHeader";
import {ProjectChatSidebar} from "#src/widgets/ProjectChatSidebar";
import {FC, useState} from "react";

interface Props {
	projects: ProjectFromApi[];
	project: ProjectFromApi;
	messages: ProjectMessageFromApi[];
	session: Session;
}

const Content: FC<Props> = ({projects, project, messages, session}) => {
	const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

	const toggleSidebarIsOpen = () => setSidebarIsOpen(prev => !prev);

	const closeSidebar = () => setSidebarIsOpen(false);

	return (
		<ProjectChat
			sidebarSlot={
				<ProjectChatSidebar
					projects={projects}
					sidebarIsOpen={sidebarIsOpen}
					onSidebarClose={closeSidebar}
				/>
			}
			headerSlot={
				<ProjectChatHeader
					name={project.name}
					userCount={project.userCount}
					rightSlot={
						session.user.id !== project.ownerUser.id ? (
							<ProjectChatActionsDropdown projectId={project.id} />
						) : null
					}
					clickAreaSlot={<ShowProjectInfoClickArea projectId={project.id} />}
					onBurgerButtonClick={toggleSidebarIsOpen}
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

export default Content;
