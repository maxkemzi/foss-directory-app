"use client";

import {ProjectChatLayout} from "#src/entities/projectChat";
import {ProjectChatFromApi, ProjectChatMessageFromApi} from "#src/shared/api";
import {Session} from "#src/shared/auth";
import {FC, useState} from "react";
import Body from "./Body";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface Props {
	chat: ProjectChatFromApi;
	chats: ProjectChatFromApi[];
	initialMessages: ProjectChatMessageFromApi[];
	session: Session;
	isChatActive?: (projectId: ProjectChatFromApi["projectId"]) => boolean;
	onChatClick?: (projectId: ProjectChatFromApi["projectId"]) => void;
}

const ProjectChatCard: FC<Props> = ({
	chat,
	chats,
	initialMessages,
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
					chats={chats}
					isOpen={sidebarIsOpen}
					onClose={closeSidebar}
					isChatActive={isChatActive}
					onChatClick={onChatClick}
				/>
			}
			headerSlot={
				<Header
					chat={chat}
					userId={session.user.id}
					onBurgerButtonClick={toggleSidebarIsOpen}
				/>
			}
			bodySlot={
				<Body chat={chat} initialMessages={initialMessages} session={session} />
			}
		/>
	);
};

export default ProjectChatCard;
