"use client";

import {Pathname} from "#src/shared/constants";
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
import {useRouter} from "next/navigation";
import {FC, useCallback} from "react";
import {leaveProject} from "./actions";
import {VALIDATION_SCHEMA} from "./constants";
import {FormFields} from "./types";

interface Props extends ModalProps {
	projectId: string;
}

const LeaveProjectModal: FC<Props> = ({onClose, projectId}) => {
	const router = useRouter();
	const {showToast} = useToast();

	const handleError = useCallback(
		() => showToast({variant: "error", message: "Error leaving the project"}),
		[showToast]
	);

	const {formAction} = useFormAction<FormFields>(leaveProject, {
		onSuccess: () => {
			onClose();
			showToast({variant: "success", message: "You've left the project"});
			router.push(Pathname.CHATS);
			router.refresh();
		},
		onError: handleError,
		onValidationError: handleError,
		validationSchema: VALIDATION_SCHEMA
	});

	return (
		<Modal isOpen onClose={onClose}>
			<ModalContent>
				<ModalHeader className="flex flex-col gap-1">Leave project</ModalHeader>
				<ModalBody>
					<p>
						<span className="font-bold">Important</span>: if you are the project
						owner, the project will be deleted permanently! Are you sure you
						want to leave the project?
					</p>
				</ModalBody>
				<ModalFooter>
					<Button onPress={onClose}>Cancel</Button>
					<form action={formAction}>
						<Button type="submit" color="danger">
							Leave
						</Button>
						<input type="hidden" name="projectId" defaultValue={projectId} />
					</form>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export type {Props as LeaveProjectModalProps};
export default LeaveProjectModal;
