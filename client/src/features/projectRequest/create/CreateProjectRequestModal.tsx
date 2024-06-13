"use client";

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
import {safeCreateProjectRequest} from "./actions";

interface Props extends ModalProps {
	projectId: string;
	projectRoleId: string;
}

const CreateProjectRequestModal: FC<Props> = ({
	onClose,
	projectId,
	projectRoleId
}) => {
	const {showToast} = useToast();

	const {execute, isPending} = useSafeAction(safeCreateProjectRequest, {
		onSuccess: result => {
			showToast({variant: "success", message: result.success});
			onClose();
		},
		onError: result => {
			showToast({variant: "error", message: result.error});
		}
	});

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		execute({projectId, projectRoleId});
	};

	return (
		<Modal isOpen onClose={onClose}>
			<ModalContent>
				<ModalHeader className="flex flex-col gap-1">Role request</ModalHeader>
				<ModalBody>
					<p>Are you sure you want to request role?</p>
				</ModalBody>
				<ModalFooter>
					<Button color="danger" variant="light" onPress={onClose}>
						Cancel
					</Button>
					<form onSubmit={handleSubmit}>
						<Button color="primary" isDisabled={isPending} type="submit">
							Request
						</Button>
					</form>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export type {Props as CreateProjectRequestModalProps};
export default CreateProjectRequestModal;
