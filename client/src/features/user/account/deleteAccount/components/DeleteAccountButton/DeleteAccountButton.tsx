"use client";

import {useModal} from "#src/shared/modal";
import {Button} from "@nextui-org/react";
import DeleteAccountModal, {
	DeleteAccountModalProps
} from "../DeleteAccountModal/DeleteAccountModal";

const DeleteAccountButton = () => {
	const {openModal} = useModal();

	const handleClick = () => {
		openModal<DeleteAccountModalProps>({
			component: DeleteAccountModal
		});
	};

	return (
		<Button onClick={handleClick} color="danger">
			Delete Account
		</Button>
	);
};

export default DeleteAccountButton;
