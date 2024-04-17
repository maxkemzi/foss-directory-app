"use client";

import {Pathname} from "#src/constants";
import {Modal, ModalBody, ModalContent, ModalHeader} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {FC} from "react";
import {CustomModalProps} from "../types";
import Form from "./Form/Form";

// TODO: split code into separate components
const CreateProjectModal: FC<CustomModalProps> = ({isOpen, onClose}) => {
	const router = useRouter();

	const handleSuccess = () => {
		onClose();
		router.push(Pathname.MY_PROJECTS);
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalContent>
				<ModalHeader className="flex flex-col gap-1">
					Project Creation
				</ModalHeader>
				<ModalBody>
					<Form onSuccess={handleSuccess} onClose={onClose} />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default CreateProjectModal;
