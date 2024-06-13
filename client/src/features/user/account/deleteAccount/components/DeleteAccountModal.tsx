"use client";

import {logOut} from "#src/shared/auth";
import {useSafeAction} from "#src/shared/hooks";
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
import {FC, FormEvent} from "react";
import {safeDeleteAccount} from "../actions";

type Props = ModalProps;

const DeleteAccountModal: FC<Props> = ({onClose}) => {
	const {showToast} = useToast();
	const {execute, isPending} = useSafeAction(safeDeleteAccount, {
		onSuccess: async result => {
			await logOut();
			showToast({variant: "success", message: result.success});
			onClose();
		},
		onError: result => {
			showToast({variant: "error", message: result.error});
		}
	});

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		execute();
	};

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
							<form onSubmit={handleSubmit}>
								<Button color="danger" isDisabled={isPending} type="submit">
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
