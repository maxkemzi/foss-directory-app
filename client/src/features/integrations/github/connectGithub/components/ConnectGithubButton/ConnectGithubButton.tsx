"use client";

import {useModal} from "#src/shared/modal";
import {Button} from "@nextui-org/react";
import ConnectGithubModal, {
	ConnectGithubModalProps
} from "../ConnectGithubModal/ConnectGithubModal";

const ConnectGithubButton = () => {
	const {openModal} = useModal();

	const handleClick = () => {
		openModal<ConnectGithubModalProps>({
			component: ConnectGithubModal
		});
	};

	return (
		<Button onClick={handleClick} color="primary">
			Connect Github
		</Button>
	);
};

export default ConnectGithubButton;
