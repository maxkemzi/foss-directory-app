"use client";

import {ProjectChatBody} from "#src/entities/project";
import {
	ProjectMessage,
	ProjectMessageList,
	ProjectMessageListRef
} from "#src/entities/projectMessage";
import {useSocketConnection} from "#src/features/socket/connect";
import {SendProjectMessageForm} from "#src/features/projectMessage/send";
import {ProjectFromApi, ProjectMessageFromApi} from "#src/shared/apis";
import {Session} from "#src/shared/auth";
import {useEffectUpdateOnly} from "#src/shared/hooks";
import {FC, useCallback, useRef, useState} from "react";

interface Props {
	project: ProjectFromApi;
	initialMessages: ProjectMessageFromApi[];
	session: Session;
}

const Body: FC<Props> = ({project, initialMessages, session}) => {
	const messageListRef = useRef<ProjectMessageListRef>(null);
	const [messages, setMessages] = useState(initialMessages);

	const handleChatMessage = useCallback((message: ProjectMessageFromApi) => {
		setMessages(prev => [message, ...prev]);
	}, []);
	const {socket} = useSocketConnection({
		projectId: project.id,
		accessToken: session.tokens.access,
		onChatMessage: handleChatMessage
	});

	useEffectUpdateOnly(() => {
		messageListRef.current?.scrollToEnd();
	}, [messages]);

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

	return (
		<ProjectChatBody
			contentSlot={
				<ProjectMessageList ref={messageListRef}>
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
