"use client";

import {ProjectChatBody} from "#src/entities/projectChat";
import {
	ProjectChatMessage,
	ProjectChatMessageList,
	ProjectChatMessageListRef
} from "#src/entities/projectChatMessage";
import {useProjectChatSocketConnection} from "#src/features/projectChat/connectToSocket";
import {SendProjectChatMessageForm} from "#src/features/projectChatMessage/send";
import {ProjectChatFromApi, ProjectChatMessageFromApi} from "#src/shared/api";
import {Session} from "#src/shared/auth";
import {useEffectUpdateOnly} from "#src/shared/hooks";
import {FC, useCallback, useRef, useState} from "react";

interface Props {
	chat: ProjectChatFromApi;
	initialMessages: ProjectChatMessageFromApi[];
	session: Session;
}

const Body: FC<Props> = ({chat, initialMessages, session}) => {
	const messageListRef = useRef<ProjectChatMessageListRef>(null);
	const [messages, setMessages] = useState(initialMessages);

	const handleChatMessage = useCallback(
		(message: ProjectChatMessageFromApi) => {
			setMessages(prev => [message, ...prev]);
		},
		[]
	);
	const {socket} = useProjectChatSocketConnection({
		projectId: chat.projectId,
		accessToken: session.tokens.access,
		onChatMessage: handleChatMessage
	});

	useEffectUpdateOnly(() => {
		messageListRef.current?.scrollToEnd();
	}, [messages]);

	const handleMessageSend = useCallback(
		(message: string) => {
			socket?.emit("chat message", {
				projectId: chat.projectId,
				text: message,
				type: "regular"
			});
		},
		[chat.projectId, socket]
	);

	return (
		<ProjectChatBody
			contentSlot={
				<ProjectChatMessageList ref={messageListRef}>
					{messages.map((message, index, arr) => {
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
							<ProjectChatMessage
								key={message.id}
								message={message}
								isMine={isMine}
								isSequential={isSequential}
							/>
						);
					})}
				</ProjectChatMessageList>
			}
			bottomSlot={<SendProjectChatMessageForm onSend={handleMessageSend} />}
		/>
	);
};

export default Body;
