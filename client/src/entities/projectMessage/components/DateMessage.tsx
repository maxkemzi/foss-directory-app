"use client";

import {Chip} from "@nextui-org/react";
import {FC, PropsWithChildren} from "react";
import {DateMessage as DateMessageType} from "../types";
import MessageContainer from "./MessageContainer";
import MessageText from "./MessageText";

interface Props {
	message: DateMessageType;
}

const DateMessageContent: FC<PropsWithChildren> = ({children}) => {
	return (
		<MessageContainer>
			<div className="ml-auto mr-auto">
				<Chip size="lg">
					<MessageText>{children}</MessageText>
				</Chip>
			</div>
		</MessageContainer>
	);
};

const DateMessage: FC<Props> = ({message}) => {
	const {isoDate} = message;

	const date = new Date(isoDate);
	const currentDate = new Date();

	const options: Intl.DateTimeFormatOptions = {
		month: "long",
		day: "numeric"
	};

	if (date.getFullYear() !== currentDate.getFullYear()) {
		options.year = "numeric";
	}

	const time = new Intl.DateTimeFormat("en", options).format(date);

	return (
		<DateMessageContent>
			<time dateTime={time}>{time}</time>
		</DateMessageContent>
	);
};

export default DateMessage;
