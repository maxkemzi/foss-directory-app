"use client";

import {Route} from "#src/constants";
import {
	Avatar,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger
} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {Key} from "react";
import {logOut} from "./actions";

const UserDropdown = ({user}: {user: any}) => {
	const router = useRouter();

	const handleAction = (key: Key) => {
		switch (key) {
			case "log-out":
				logOut();
				break;
			case "settings":
				router.push(Route.SETTINGS);
				break;
			case "create-project":
				router.push("?modal=create-project");
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
					src={user.avatar}
				/>
			</DropdownTrigger>
			<DropdownMenu
				onAction={handleAction}
				aria-label="User Actions"
				variant="flat"
			>
				<DropdownItem key="profile" className="h-14 gap-2">
					<p className="font-semibold">Signed in as</p>
					<p className="font-semibold">{user.email}</p>
				</DropdownItem>
				<DropdownItem key="create-project">Create Project</DropdownItem>
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
