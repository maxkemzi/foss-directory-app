"use client";

import {ProjectChatFromApi, ProjectChatMessageFromApi} from "#src/shared/api";
import {Session} from "#src/shared/auth";
import {Pathname} from "#src/shared/constants";
import {ProjectChatCard} from "#src/widgets/ProjectChatCard";
import {usePathname, useRouter} from "next/navigation";
import {FC} from "react";
import {revalidateChatPath} from "./actions";

interface Props {
	chats: ProjectChatFromApi[];
	chat: ProjectChatFromApi;
	initialMessages: ProjectChatMessageFromApi[];
	session: Session;
}

const Chat: FC<Props> = ({chats, chat, initialMessages, session}) => {
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
			chats={chats}
			chat={chat}
			initialMessages={initialMessages}
			session={session}
			isChatActive={handleIsChatActive}
			onChatClick={handleChatClick}
		/>
	);
};

export default Chat;
