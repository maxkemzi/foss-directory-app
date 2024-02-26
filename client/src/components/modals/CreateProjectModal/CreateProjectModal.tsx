"use client";

import {Modal, ModalBody, ModalContent, ModalHeader} from "@nextui-org/react";
import {FC} from "react";
import {CustomModalProps} from "../types";
import Form from "./Form/Form";

// TODO: split code into separate components
const CreateProjectModal: FC<CustomModalProps> = ({isOpen, onClose}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalContent>
				{handleClose => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							Project Creation
						</ModalHeader>
						<ModalBody>
							<Form onClose={handleClose} />
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default CreateProjectModal;
