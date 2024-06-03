"use client";

import {useModal} from "#src/shared/modal";
import {FC} from "react";
import ShowProjectInfoModal, {
	ShowProjectInfoModalProps
} from "./ShowProjectInfoModal";

interface Props {
	projectId: string;
}

const ShowProjectInfoClickArea: FC<Props> = ({projectId}) => {
	const {openModal} = useModal();

	const handleClick = () => {
		openModal<ShowProjectInfoModalProps>({
			component: ShowProjectInfoModal,
			props: {projectId}
		});
	};

	return (
		<button
			aria-label="show chat info"
			className="before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0"
			onClick={handleClick}
			type="button"
		/>
	);
};

export default ShowProjectInfoClickArea;
