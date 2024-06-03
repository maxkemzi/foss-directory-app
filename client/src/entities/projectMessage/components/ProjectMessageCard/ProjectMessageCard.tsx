"use client";

import {ProjectMessageFromApi} from "#src/shared/api";
import {FC} from "react";
import DateMessageCard from "../DateMessageCard/DateMessageCard";
import JoinMessageCard from "../JoinMessageCard/JoinMessageCard";
import SequentialMessageCard from "../SequentialMessageCard/SequentialMessageCard";
import UserMessageCard from "../UserMessageCard/UserMessageCard";
import YourMessageCard from "../YourMessageCard/YourMessageCard";

interface Props {
	message: ProjectMessageFromApi;
	isMine: boolean;
	isSequential: boolean;
}

const ProjectMessageCard: FC<Props> = ({message, isMine, isSequential}) => {
	const {type} = message;

	if (type === "join") {
		return <JoinMessageCard message={message} />;
	}

	if (type === "date") {
		return <DateMessageCard message={message} />;
	}

	if (isMine) {
		return <YourMessageCard message={message} />;
	}

	if (isSequential) {
		return <SequentialMessageCard message={message} />;
	}

	return <UserMessageCard message={message} />;
};

export default ProjectMessageCard;
