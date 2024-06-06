"use client";

import {logOut} from "#src/shared/auth";
import {
	CreateProjectModal,
	CreateProjectModalProps
} from "#src/features/project/create";
import {UserFromApi} from "#src/shared/api";
import {Pathname} from "#src/shared/constants";
import {useModal} from "#src/shared/modal";
import {useToast} from "#src/shared/toast";
import {
	Avatar,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger
} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {FC, Key} from "react";

interface Props {
	user: UserFromApi;
}

const UserDropdown: FC<Props> = ({user}) => {
	const router = useRouter();
	const {showToast} = useToast();
	const {openModal} = useModal();

	const handleAction = async (key: Key) => {
		switch (key) {
			case "create-project":
				openModal<CreateProjectModalProps>({component: CreateProjectModal});
				break;
			case "chats":
				router.push(Pathname.CHATS);
				break;
			case "requests":
				router.push(Pathname.REQUESTS);
				break;
			case "your-projects":
				router.push(Pathname.YOUR_PROJECTS);
				break;
			case "settings":
				router.push(Pathname.SETTINGS);
				break;
			case "log-out":
				await logOut();
				showToast({variant: "success", message: "Successfuly logged out"});
				break;
			default:
				break;
		}
	};

	return (
		<Dropdown placement="bottom-end">
			<DropdownTrigger>
				<Avatar
					isBordered
					as="button"
					className="transition-transform"
					color="secondary"
					name={user.username}
					size="sm"
					src={user.avatar || undefined}
				/>
			</DropdownTrigger>
			<DropdownMenu
				onAction={handleAction}
				aria-label="User Actions"
				variant="flat"
			>
				<DropdownItem key="profile" className="h-14 gap-2">
					<p className="font-semibold">Signed in as</p>
					<p className="font-semibold">{user.username}</p>
				</DropdownItem>
				<DropdownItem key="create-project">Create Project</DropdownItem>
				<DropdownItem key="chats">Chats</DropdownItem>
				<DropdownItem key="requests">Requests</DropdownItem>
				<DropdownItem key="your-projects">Your Projects</DropdownItem>
				<DropdownItem key="settings">Settings</DropdownItem>
				<DropdownItem key="log-out" color="danger">
					Log Out
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};

export default UserDropdown;
