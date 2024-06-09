"use client";

import {useModal} from "#src/shared/modal";
import {FC} from "react";
import ShowProjectChatInfoModal, {
	ShowProjectChatInfoModalProps
} from "./ShowProjectChatInfoModal";

interface Props {
	projectId: string;
}

const ShowProjectChatInfoClickArea: FC<Props> = ({projectId}) => {
	const {openModal} = useModal();

	const handleClick = () => {
		openModal<ShowProjectChatInfoModalProps>({
			component: ShowProjectChatInfoModal,
			props: {projectId}
		});
	};

	return (
		<button
			aria-label="show chat info"
			className="absolute top-0 bottom-0 left-0 right-0"
			onClick={handleClick}
			type="button"
		/>
	);
};

export default ShowProjectChatInfoClickArea;
