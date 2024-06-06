"use client";

import {Card, CardBody} from "@nextui-org/react";
import classNames from "classnames";
import {FC} from "react";
import {ProjectChatFromApi} from "../../../shared/api/types";

interface Props {
	chat: ProjectChatFromApi;
	isActive: boolean;
}

const ProjectChat: FC<Props> = ({chat, isActive}) => {
	const {name} = chat;
	return (
		<Card classNames={{base: classNames({"bg-primary": isActive})}}>
			<CardBody>
				<p className="truncate">{name}</p>
			</CardBody>
		</Card>
	);
};

export default ProjectChat;
