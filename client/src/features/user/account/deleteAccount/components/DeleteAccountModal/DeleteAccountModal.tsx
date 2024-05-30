"use client";

import {logOut} from "#src/features/auth";
import {useFormAction} from "#src/shared/hooks";
import {ModalProps} from "#src/shared/modal";
import {useToast} from "#src/shared/toast";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from "@nextui-org/react";
import {FC} from "react";
import {deleteAccount} from "./actions";

type Props = ModalProps;

const DeleteAccountModal: FC<Props> = ({onClose}) => {
	const {showToast} = useToast();
	const {formAction} = useFormAction(deleteAccount, {
		onSuccess: async () => {
			await logOut();
			showToast({variant: "success", message: "Account has been deleted"});
		},
		onError: () => {
			showToast({variant: "error", message: "Error deleting account"});
		}
	});

	return (
		<Modal isOpen onClose={onClose}>
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
							<Button variant="light" onClick={handleClose}>
								Cancel
							</Button>
							<form action={formAction}>
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
};

export type {Props as DeleteAccountModalProps};
export default DeleteAccountModal;
