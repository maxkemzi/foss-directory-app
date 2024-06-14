"use client";

import {ProjectChatBody} from "#src/entities/project";
import {
	ProjectMessage,
	ProjectMessageList,
	ProjectMessageListRef
} from "#src/entities/projectMessage";
import {FetchMoreButton} from "#src/features/fetchMore";
import {SendProjectMessageForm} from "#src/features/projectMessage/send";
import {useSocketConnection} from "#src/features/socket/connect";
import {ProjectFromApi, ProjectMessageFromApi} from "#src/shared/apis";
import {Session} from "#src/shared/auth";
import {useEffectUpdateOnly} from "#src/shared/hooks";
import {FC, useCallback, useMemo, useRef, useState} from "react";

interface Props {
	messages: {
		data: ProjectMessageFromApi[];
		hasMore: boolean;
		isFetching: boolean;
		onFetchMore: () => void;
	};
	project: ProjectFromApi;
	session: Session;
}

const Body: FC<Props> = ({project, messages, session}) => {
	const messageListRef = useRef<ProjectMessageListRef>(null);
	const [newMessages, setNewMessages] = useState<ProjectMessageFromApi[]>([]);

	const {socket} = useSocketConnection({
		projectId: project.id,
		accessToken: session.tokens.access,
		onChatMessage: message => {
			setNewMessages(prev => [message, ...prev]);
		}
	});

	useEffectUpdateOnly(() => {
		messageListRef.current?.scrollToEnd();
	}, [newMessages]);

	const handleMessageSend = useCallback(
		(message: string) => {
			socket?.emit("chat message", {
				projectId: project.id,
				text: message,
				type: "regular"
			});
		},
		[project.id, socket]
	);

	const allMessages = useMemo(
		() => [...newMessages, ...messages.data],
		[messages, newMessages]
	);

	return (
		<ProjectChatBody
			contentSlot={
				<ProjectMessageList
					ref={messageListRef}
					topSlot={
						messages.hasMore ? (
							<FetchMoreButton
								className="mt-6"
								isFetching={messages.isFetching}
								onFetchMore={messages.onFetchMore}
							/>
						) : null
					}
				>
					{allMessages.map((message, index, arr) => {
						const isMine =
							message.sender != null
								? message.sender.user.id === session.user.id
								: false;

						const prevMessage = arr[index + 1];
						const isSequential =
							message.sender != null &&
							prevMessage?.sender != null &&
							prevMessage.sender.user.id === message.sender.user.id &&
							prevMessage.type === "regular";

						return (
							<ProjectMessage
								key={message.id}
								message={message}
								isMine={isMine}
								isSequential={isSequential}
							/>
						);
					})}
				</ProjectMessageList>
			}
			bottomSlot={<SendProjectMessageForm onSend={handleMessageSend} />}
		/>
	);
};

export default Body;
