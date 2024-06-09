"use client";

import {ProjectFromApi, ProjectMessageFromApi} from "#src/shared/api";
import {Session} from "#src/shared/auth";
import {Pathname} from "#src/shared/constants";
import {ProjectChatCard} from "#src/widgets/ProjectChatCard";
import {usePathname, useRouter} from "next/navigation";
import {FC} from "react";
import {revalidateChatPath} from "./actions";

interface Props {
	projects: ProjectFromApi[];
	project: ProjectFromApi;
	initialMessages: ProjectMessageFromApi[];
	session: Session;
}

const Chat: FC<Props> = ({projects, project, initialMessages, session}) => {
	const pathname = usePathname();
	const router = useRouter();

	const getChatPath = (projectId: string) => `${Pathname.CHATS}/${projectId}`;

	const handleIsChatActive = (projectId: string) =>
		pathname === getChatPath(projectId);

	const handleChatClick = async (projectId: string) => {
		const path = getChatPath(projectId);

		await revalidateChatPath(path);
		router.replace(path);
	};

	return (
		<ProjectChatCard
			projects={projects}
			project={project}
			initialMessages={initialMessages}
			session={session}
			isChatActive={handleIsChatActive}
			onChatClick={handleChatClick}
		/>
	);
};

export default Chat;
