"use client";

import {Card, CardBody} from "@nextui-org/react";
import {FC, ReactNode} from "react";

interface Props {
	contentSlot?: ReactNode;
	bottomSlot?: ReactNode;
}

const ProjectChatBody: FC<Props> = ({contentSlot, bottomSlot}) => {
	return (
		<div className="h-full flex flex-col gap-4">
			<Card
				fullWidth
				classNames={{
					base: "flex-grow",
					body: "p-0 overflow-hidden"
				}}
			>
				<CardBody>{contentSlot}</CardBody>
			</Card>
			{bottomSlot}
		</div>
	);
};

export default ProjectChatBody;
