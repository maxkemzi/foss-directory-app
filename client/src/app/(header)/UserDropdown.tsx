"use client";

import {Avatar} from "@nextui-org/avatar";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger
} from "@nextui-org/dropdown";
import {Key} from "react";
import {logOut} from "./actions";

const UserDropdown = ({user}) => {
	const handleAction = (key: Key) => {
		switch (key) {
			case "log_out":
				return logOut();
			default:
				return;
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
				<DropdownItem key="create_project">Create Project</DropdownItem>
				<DropdownItem key="my_projects">My Projects</DropdownItem>
				<DropdownItem key="log_out" color="danger">
					Log Out
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};

export default UserDropdown;
