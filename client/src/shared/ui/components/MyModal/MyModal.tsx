"use client";

import {ModalProps} from "#src/shared/modal";
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from "@nextui-org/react";
import {FC, ReactNode} from "react";

interface Props extends ModalProps {
	headerSlot: ReactNode;
	bodySlot: ReactNode;
	footerSlot: ReactNode;
}

const MyModal: FC<Props> = ({onClose, headerSlot, bodySlot, footerSlot}) => {
	return (
		<Modal isOpen onClose={onClose}>
			<ModalContent>
				<ModalHeader>{headerSlot}</ModalHeader>
				<ModalBody>{bodySlot}</ModalBody>
				<ModalFooter>{footerSlot}</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default MyModal;
