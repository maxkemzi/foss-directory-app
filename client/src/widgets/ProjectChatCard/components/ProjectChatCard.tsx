"use client";

import {ProjectChatLayout} from "#src/entities/project";
import {ProjectFromApi, ProjectMessageFromApi} from "#src/shared/apis";
import {Session} from "#src/shared/auth";
import {FC, useState} from "react";
import Body from "./Body";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface Props {
	projects: {
		data: ProjectFromApi[];
		hasMore: boolean;
		isFetching: boolean;
		onFetchMore: () => void;
	};
	messages: {
		data: ProjectMessageFromApi[];
		hasMore: boolean;
		isFetching: boolean;
		onFetchMore: () => void;
	};
	project: ProjectFromApi;
	session: Session;
	isChatActive?: (projectId: ProjectFromApi["id"]) => boolean;
	onChatClick?: (projectId: ProjectFromApi["id"]) => void;
}

const ProjectChatCard: FC<Props> = ({
	projects,
	messages,
	project,
	session,
	isChatActive,
	onChatClick
}) => {
	const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

	const closeSidebar = () => setSidebarIsOpen(false);
	const toggleSidebarIsOpen = () => setSidebarIsOpen(prev => !prev);

	return (
		<ProjectChatLayout
			sidebarSlot={
				<Sidebar
					projects={projects.data}
					hasMore={projects.hasMore}
					isFetching={projects.isFetching}
					onFetchMore={projects.onFetchMore}
					isOpen={sidebarIsOpen}
					onClose={closeSidebar}
					isChatActive={isChatActive}
					onChatClick={onChatClick}
				/>
			}
			headerSlot={
				<Header
					project={project}
					userId={session.user.id}
					onBurgerButtonClick={toggleSidebarIsOpen}
				/>
			}
			bodySlot={
				<Body project={project} messages={messages} session={session} />
			}
		/>
	);
};

export default ProjectChatCard;
