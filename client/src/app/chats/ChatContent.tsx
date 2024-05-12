"use client";

import {ProjectMessageFromApi} from "#src/types/apis";
import {Session} from "#src/types/actions/auth";
import {Avatar, Button, Card, CardBody, Input} from "@nextui-org/react";
import {ChangeEvent, FC, FormEvent, useEffect, useState} from "react";
import {Socket, io} from "socket.io-client";

interface Props {
	initialMessages: ProjectMessageFromApi[];
	projectId: string;
	session: Session;
}

const ChatContent: FC<Props> = ({initialMessages, projectId, session}) => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [newMessage, setNewMessage] = useState("");
	const [messages, setMessages] = useState(initialMessages);

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
			text: newMessage
		});
		setNewMessage("");
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
		setNewMessage(e.target.value);

	const renderMessage = (
		message: ProjectMessageFromApi,
		index: number,
		arr: ProjectMessageFromApi[]
	) => {
		const {id, text, sender, createdAt} = message;

		const date = new Date(createdAt);
		const formattedTime = new Intl.DateTimeFormat("en", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: false
		}).format(date);

		if (sender.id === session.user.id) {
			return (
				<div key={id} className="flex flex-col gap-2 ml-auto">
					<Card classNames={{base: "bg-primary"}}>
						<CardBody>
							<p>{text}</p>
						</CardBody>
					</Card>
					<p className="self-end text-sm text-foreground-400">
						{formattedTime}
					</p>
				</div>
			);
		}

		const prevMessage = arr[index + 1];
		if (prevMessage && prevMessage.sender.id === message.sender.id) {
			return (
				<div
					key={id}
					className="grid grid-cols-[32px,_auto] justify-start gap-4"
				>
					<div className="flex flex-col gap-2 col-start-2">
						<Card classNames={{base: "bg-content2"}}>
							<CardBody>
								<p>{text}</p>
							</CardBody>
						</Card>
						<p className="text-sm text-foreground-400">{formattedTime}</p>
					</div>
				</div>
			);
		}

		return (
			<div key={id} className="grid grid-cols-[32px,_auto] justify-start gap-4">
				<Avatar size="sm" isBordered color="secondary" name={sender.username} />
				<div className="flex flex-col gap-2">
					<p className="font-semibold">{sender.role.name}</p>
					<Card classNames={{base: "bg-content2"}}>
						<CardBody>
							<p>{text}</p>
						</CardBody>
					</Card>
					<p className="text-sm text-foreground-400">{formattedTime}</p>
				</div>
			</div>
		);
	};

	return (
		<div className="flex flex-col items-start gap-6">
			<Card
				fullWidth
				classNames={{
					base: "flex-grow",
					body: "p-6 gap-4 flex-col-reverse"
				}}
			>
				<CardBody>{messages.map(renderMessage)}</CardBody>
			</Card>
			<form className="w-full flex gap-2 flex-shrink-0" onSubmit={sendMessage}>
				<div className="flex-grow">
					<Input onChange={handleChange} label="Message" value={newMessage} />
				</div>
				<Button className="h-auto" color="primary" type="submit">
					Send
				</Button>
			</form>
		</div>
	);
};

export default ChatContent;
