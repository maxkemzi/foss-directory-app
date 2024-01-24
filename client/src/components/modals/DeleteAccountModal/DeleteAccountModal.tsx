import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from "@nextui-org/react";
import {FC} from "react";
import {CustomModalProps} from "../types";
import {deleteAccount} from "./actions";

const DeleteAccountModal: FC<CustomModalProps> = ({isOpen, onClose}) => (
	<Modal isOpen={isOpen} onClose={onClose}>
		<ModalContent>
			{handleClose => (
				<>
					<ModalHeader className="flex flex-col gap-1">
						Account Deletion
					</ModalHeader>
					<ModalBody>
						<p>
							Are you sure you want to delete your account? All your data will
							be lost forever.
						</p>
					</ModalBody>
					<ModalFooter>
						<Button variant="light" onPress={handleClose}>
							Cancel
						</Button>
						<form action={deleteAccount}>
							<Button type="submit" color="danger">
								Delete
							</Button>
						</form>
					</ModalFooter>
				</>
			)}
		</ModalContent>
	</Modal>
);

export default DeleteAccountModal;
