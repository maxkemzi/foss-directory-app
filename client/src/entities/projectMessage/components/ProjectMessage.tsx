"use client";

import {ProjectMessageFromApi} from "#src/shared/api";
import {FC} from "react";
import DateMessage from "./DateMessage";
import JoinMessage from "./JoinMessage";
import SequentialMessage from "./SequentialMessage";
import UserMessage from "./UserMessage/UserMessage";
import YourMessage from "./YourMessage";

interface Props {
	message: ProjectMessageFromApi;
	isMine: boolean;
	isSequential: boolean;
}

const ProjectMessage: FC<Props> = ({message, isMine, isSequential}) => {
	const {type} = message;

	if (type === "join") {
		return <JoinMessage message={message} />;
	}

	if (type === "date") {
		return <DateMessage message={message} />;
	}

	if (isMine) {
		return <YourMessage message={message} />;
	}

	if (isSequential) {
		return <SequentialMessage message={message} />;
	}

	return <UserMessage message={message} />;
};

export default ProjectMessage;
