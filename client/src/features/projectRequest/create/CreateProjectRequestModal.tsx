"use client";

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
import {FC, useCallback} from "react";
import {createProjectRequest} from "./actions";
import {VALIDATION_SCHEMA} from "./constants";
import {FormFields} from "./types";

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

	const handleError = useCallback(
		() =>
			showToast({variant: "error", message: "Error creating project request"}),
		[showToast]
	);

	const {formAction} = useFormAction<FormFields>(createProjectRequest, {
		onSuccess() {
			onClose();
			showToast({variant: "success", message: "Request has been created"});
		},
		onError: handleError,
		onValidationError: handleError,
		validationSchema: VALIDATION_SCHEMA
	});

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
					<form action={formAction}>
						<Button type="submit" color="primary">
							Request
						</Button>
						<input type="hidden" name="projectId" defaultValue={projectId} />
						<input
							type="hidden"
							name="projectRoleId"
							defaultValue={projectRoleId}
						/>
					</form>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export type {Props as CreateProjectRequestModalProps};
export default CreateProjectRequestModal;