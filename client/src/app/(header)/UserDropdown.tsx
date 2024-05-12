"use client";

import {signOut} from "#src/actions/auth";
import {ModalVariant, Pathname} from "#src/constants";
import {UserFromApi} from "#src/types/apis";
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

	const handleAction = async (key: Key) => {
		switch (key) {
			case "create-project":
				router.push(`?modal=${ModalVariant.CREATE_PROJECT}`);
				break;
			case "chats":
				router.push(Pathname.CHATS);
				break;
			case "requests":
				router.push(Pathname.REQUESTS);
				break;
			case "my-projects":
				router.push(Pathname.MY_PROJECTS);
				break;
			case "settings":
				router.push(Pathname.SETTINGS);
				break;
			case "log-out":
				await signOut();
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
				<DropdownItem key="my-projects">My Projects</DropdownItem>
				<DropdownItem key="settings">Settings</DropdownItem>
				<DropdownItem key="log-out" color="danger">
					Log Out
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};

export default UserDropdown;
