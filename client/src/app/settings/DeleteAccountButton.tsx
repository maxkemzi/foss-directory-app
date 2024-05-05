"use client";

import {ModalVariant} from "#src/constants";
import {Button, Link} from "@nextui-org/react";
import {usePathname} from "next/navigation";

const DeleteAccountButton = () => {
	const pathname = usePathname();
	return (
		<Button
			as={Link}
			color="danger"
			href={`${pathname}?modal=${ModalVariant.DELETE_ACCOUNT}`}
		>
			Delete Account
		</Button>
	);
};

export default DeleteAccountButton;
