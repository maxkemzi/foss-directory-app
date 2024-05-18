"use client";

import {ModalVariant} from "#src/constants";
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
import {useRouter} from "next/navigation";
import {FC, Key} from "react";

interface Props {
	projectId: string;
}

const ActionKey = {
	LEAVE_PROJECT: "leave-project"
};

const ChatHeader: FC<Props> = ({projectId}) => {
	const router = useRouter();

	const handleAction = (key: Key) => {
		switch (key) {
			case ActionKey.LEAVE_PROJECT:
				router.push(
					`?modal=${ModalVariant.LEAVE_PROJECT}&project-id=${projectId}`
				);
				break;
			default:
				break;
		}
	};

	return (
		<Card fullWidth>
			<CardBody>
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
			</CardBody>
		</Card>
	);
};

export default ChatHeader;
