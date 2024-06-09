"use client";

import {Button, Input} from "@nextui-org/react";
import {ChangeEvent, FC, FormEvent, useRef, useState} from "react";
import {VALIDATION_SCHEMA} from "./constants";

interface Props {
	onSend: (message: string) => void;
}

const SendProjectMessageForm: FC<Props> = ({onSend}) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [newMessage, setNewMessage] = useState("");
	const [isInvalid, setIsInvalid] = useState<boolean>(false);

	const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const validationResult = VALIDATION_SCHEMA.safeParse(newMessage);
		if (!validationResult.success) {
			setIsInvalid(true);
			return;
		}
		setIsInvalid(false);

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
					isInvalid={isInvalid}
				/>
			</div>
			<Button className="flex-shrink-0 h-auto" color="primary" type="submit">
				Send
			</Button>
		</form>
	);
};

export default SendProjectMessageForm;
