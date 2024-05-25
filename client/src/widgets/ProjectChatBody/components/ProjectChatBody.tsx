"use client";

import {ProjectMessageCard} from "#src/entities/projectMessage";
import {ProjectMessageFromApi} from "#src/shared/api";
import {Session} from "#src/shared/auth";
import {Button, Card, CardBody, Input} from "@nextui-org/react";
import {ChangeEvent, FC, FormEvent, useEffect, useRef, useState} from "react";
import {Socket, io} from "socket.io-client";

interface Props {
	initialMessages: ProjectMessageFromApi[];
	projectId: string;
	session: Session;
}

const ProjectChatBody: FC<Props> = ({initialMessages, projectId, session}) => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [newMessage, setNewMessage] = useState("");
	const [messages, setMessages] = useState(initialMessages);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const newSocket = io(process.env.NEXT_PUBLIC_SERVER_URL as string, {
			auth: {token: session.tokens.access},
			query: {projectId}
		});

		newSocket.on("chat message", message => {
			setMessages(prev => [message, ...prev]);
		});

		setSocket(newSocket);

		return () => {
			newSocket.disconnect();
		};
	}, [session, projectId]);

	const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		socket?.emit("chat message", {
			projectId,
			text: newMessage,
			type: "regular"
		});
		setNewMessage("");

		inputRef.current?.focus();
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
		setNewMessage(e.target.value);

	return (
		<div className="h-full flex flex-col gap-4">
			<Card
				fullWidth
				classNames={{
					base: "h-full",
					body: "p-6 gap-4 flex-col-reverse"
				}}
			>
				<CardBody>
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
							<ProjectMessageCard
								key={message.id}
								message={message}
								isMine={isMine}
								isSequential={isSequential}
							/>
						);
					})}
				</CardBody>
			</Card>
			<form className="flex gap-2" onSubmit={sendMessage}>
				<div className="flex-grow">
					<Input
						ref={inputRef}
						onChange={handleChange}
						label="Message"
						value={newMessage}
					/>
				</div>
				<Button className="flex-shrink-0 h-auto" color="primary" type="submit">
					Send
				</Button>
			</form>
		</div>
	);
};

export type {Props as ProjectChatBodyProps};
export default ProjectChatBody;
