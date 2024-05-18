"use client";

import {MessageCard} from "#src/components";
import {Session} from "#src/types/actions/auth";
import {ProjectMessageFromApi} from "#src/types/apis";
import {Button, Card, CardBody, Input} from "@nextui-org/react";
import {ChangeEvent, FC, FormEvent, useEffect, useRef, useState} from "react";
import {Socket, io} from "socket.io-client";

interface Props {
	initialMessages: ProjectMessageFromApi[];
	projectId: string;
	session: Session;
}

const ChatMessages: FC<Props> = ({initialMessages, projectId, session}) => {
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
		<>
			<Card
				fullWidth
				classNames={{
					body: "p-6 gap-4 flex-col-reverse"
				}}
			>
				<CardBody>
					{messages.map((message, index, arr) => {
						const isMine =
							message.user != null
								? message.user.id === session.user.id
								: false;

						const prevMessage = arr[index + 1];
						const isSequential =
							message.user != null &&
							prevMessage?.user != null &&
							prevMessage.user.id === message.user.id &&
							prevMessage.type === "regular";

						return (
							<MessageCard
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
		</>
	);
};

export default ChatMessages;
