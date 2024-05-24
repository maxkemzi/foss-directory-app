"use client";

import {parseProjectContributorCount} from "#src/entities/project";
import {
	LeaveProjectModal,
	LeaveProjectModalProps
} from "#src/features/project/leaveProject";
import {
	ShowProjectInfoModal,
	ShowProjectInfoModalProps
} from "#src/features/project/showProjectInfo";
import {ProjectFromApi} from "#src/shared/api";
import {useModal} from "#src/shared/modal";
import {EllipsisVerticalIcon} from "@heroicons/react/24/solid";
import {
	Button,
	Card,
	CardBody,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger
} from "@nextui-org/react";
import {FC, Key} from "react";

interface Props {
	project: ProjectFromApi;
}

const ActionKey = {
	LEAVE_PROJECT: "leave-project"
};

const ProjectChatHeader: FC<Props> = ({project}) => {
	const {openModal} = useModal();

	const {contributorCount, id} = project;

	const handleAction = (key: Key) => {
		switch (key) {
			case ActionKey.LEAVE_PROJECT:
				openModal<LeaveProjectModalProps>({
					component: LeaveProjectModal,
					props: {projectId: id}
				});
				break;
			default:
				break;
		}
	};

	const handleClick = () => {
		openModal<ShowProjectInfoModalProps>({
			component: ShowProjectInfoModal,
			props: {projectId: id}
		});
	};

	return (
		<Card fullWidth>
			<CardBody>
				<div className="flex items-center gap-4">
					<div>
						<h3 className="font-bold">{project.name}</h3>
						<p className="text-foreground-400">
							{parseProjectContributorCount(contributorCount)}
						</p>
					</div>
					<Dropdown classNames={{trigger: "ml-auto", content: "min-w-[100px]"}}>
						<DropdownTrigger>
							<Button isIconOnly>
								<EllipsisVerticalIcon className="w-[24px] h-[24px]" />
							</Button>
						</DropdownTrigger>
						<DropdownMenu onAction={handleAction} aria-label="Static Actions">
							<DropdownItem
								key={ActionKey.LEAVE_PROJECT}
								className="text-danger"
								color="danger"
							>
								Leave project
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</div>
				<button
					aria-label="show chat info"
					className="before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0"
					onClick={handleClick}
					type="button"
				/>
			</CardBody>
		</Card>
	);
};

export default ProjectChatHeader;
