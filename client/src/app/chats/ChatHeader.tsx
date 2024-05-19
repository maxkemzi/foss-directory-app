"use client";

import {ModalVariant} from "#src/constants";
import {parseContributorCount} from "#src/helpers";
import {ProjectFromApi} from "#src/types/apis";
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
import Link from "next/link";
import {useRouter} from "next/navigation";
import {FC, Key} from "react";

interface Props {
	project: ProjectFromApi;
}

const ActionKey = {
	LEAVE_PROJECT: "leave-project"
};

const ChatHeader: FC<Props> = ({project}) => {
	const router = useRouter();

	const {contributorCount, id} = project;

	const handleAction = (key: Key) => {
		switch (key) {
			case ActionKey.LEAVE_PROJECT:
				router.push(`?modal=${ModalVariant.LEAVE_PROJECT}&project-id=${id}`);
				break;
			default:
				break;
		}
	};

	return (
		<Card fullWidth>
			<CardBody>
				<div className="flex items-center gap-4">
					<div>
						<h3 className="font-bold">{project.name}</h3>
						<p className="text-foreground-400">
							{parseContributorCount(contributorCount)}
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
				<Link
					className="before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0"
					href={`?modal=${ModalVariant.PROJECT_CHAT_INFO}&project-id=${id}`}
				/>
			</CardBody>
		</Card>
	);
};

export default ChatHeader;
