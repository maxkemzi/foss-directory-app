"use client";

import {Card, CardBody} from "@nextui-org/react";
import classNames from "classnames";
import {FC} from "react";
import {ProjectFromApi} from "../../../shared/apis";

interface Props {
	project: ProjectFromApi;
	isActive: boolean;
}

const ProjectChat: FC<Props> = ({project, isActive}) => {
	const {name} = project;
	return (
		<Card classNames={{base: classNames({"bg-primary": isActive})}}>
			<CardBody>
				<p className="truncate">{name}</p>
			</CardBody>
		</Card>
	);
};

export default ProjectChat;
