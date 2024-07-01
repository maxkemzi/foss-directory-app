"use client";

import {useProjectList} from "#src/entities/project";
import {useProjectMessageList} from "#src/entities/projectMessage";
import {ProjectFromApi} from "#src/shared/apis";
import {
	FetchProjectResponse,
	FetchProjectsResponse
} from "#src/shared/apis/projects";
import {FetchProjectMessagesResponse} from "#src/shared/apis/projects/messages";
import {Pathname} from "#src/shared/constants";
import {ProjectChatCard} from "#src/widgets/ProjectChatCard";
import {SessionFromApi} from "foss-directory-shared";
import {usePathname, useRouter} from "next/navigation";
import {FC} from "react";

interface Props {
	projectId: ProjectFromApi["id"];
	projectsResponse: FetchProjectsResponse;
	messagesResponse: FetchProjectMessagesResponse;
	projectResponse: FetchProjectResponse;
	session: SessionFromApi;
}

const Chat: FC<Props> = ({
	projectId,
	projectsResponse,
	messagesResponse,
	projectResponse,
	session
}) => {
	const pathname = usePathname();
	const router = useRouter();

	const projectList = useProjectList("member", projectsResponse);
	const projectMessageList = useProjectMessageList(projectId, messagesResponse);

	const getChatPathByProjectId = (id: string) => `${Pathname.CHATS}/${id}`;

	const handleIsChatActive = (id: string) =>
		pathname === getChatPathByProjectId(id);

	const handleChatClick = async (id: string) => {
		const path = getChatPathByProjectId(id);

		router.replace(path);
		router.refresh();
	};

	return (
		<ProjectChatCard
			projects={{
				data: projectList.projects,
				hasMore: projectList.hasMore,
				isFetching: projectList.isFetching,
				onFetchMore: projectList.fetchMore
			}}
			messages={{
				data: projectMessageList.messages,
				hasMore: projectMessageList.hasMore,
				isFetching: projectMessageList.isFetching,
				onFetchMore: projectMessageList.fetchMore
			}}
			project={projectResponse.data}
			session={session}
			isChatActive={handleIsChatActive}
			onChatClick={handleChatClick}
		/>
	);
};

export default Chat;
