"use client";

import {logOut} from "#src/features/auth";
import {useToast} from "#src/shared/toast";
import {ModalProps} from "#src/shared/modal";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from "@nextui-org/react";
import {FC, useEffect} from "react";
import {useFormState} from "react-dom";
import {deleteAccount} from "./actions";
import {INITIAL_FORM_STATE} from "./constants";

type Props = ModalProps;

const DeleteAccountModal: FC<Props> = ({onClose}) => {
	const {showToast} = useToast();
	const [state, formAction] = useFormState(deleteAccount, INITIAL_FORM_STATE);

	useEffect(() => {
		const handleStatus = async () => {
			if (state.success) {
				await logOut();
				showToast({variant: "success", message: "Account has been deleted."});
			} else if (state.error) {
				showToast({variant: "error", message: state.error});
			}
		};

		handleStatus();
	}, [showToast, state.error, state.success, state.triggerStatusHandler]);

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
