"use client";

import {FC} from "react";
import {ExtendedProjectMessage, DateMessage as DateMessageType} from "../types";
import DateMessage from "./DateMessage";
import JoinMessage from "./JoinMessage";
import LeaveMessage from "./LeaveMessage";
import SequentialMessage from "./SequentialMessage";
import UserMessage from "./UserMessage/UserMessage";
import YourMessage from "./YourMessage";

interface Props {
	message: ExtendedProjectMessage | DateMessageType;
}

const ProjectMessage: FC<Props> = ({message}) => {
	const {type} = message;

	if (type === "join") {
		return <JoinMessage message={message} />;
	}

	if (type === "leave") {
		return <LeaveMessage message={message} />;
	}

	if (type === "date") {
		return <DateMessage message={message} />;
	}

	const {isOwn, isSequential} = message;

	if (isOwn) {
		return <YourMessage message={message} />;
	}

	if (isSequential) {
		return <SequentialMessage message={message} />;
	}

	return <UserMessage message={message} />;
};

export type {Props as ProjectMessageProps};
export default ProjectMessage;
