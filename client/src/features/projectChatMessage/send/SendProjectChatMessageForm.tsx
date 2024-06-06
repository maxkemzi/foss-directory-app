"use client";

import {Button, Input} from "@nextui-org/react";
import {ChangeEvent, FC, FormEvent, useRef, useState} from "react";

interface Props {
	onSend: (message: string) => void;
}

const SendProjectChatMessageForm: FC<Props> = ({onSend}) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [newMessage, setNewMessage] = useState("");

	const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		onSend?.(newMessage);
		setNewMessage("");

		inputRef.current?.focus();
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
		setNewMessage(e.target.value);

	return (
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
	);
};

export default SendProjectChatMessageForm;
