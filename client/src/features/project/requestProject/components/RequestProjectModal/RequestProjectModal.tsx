"use client";

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
import {createProjectRequest} from "./actions";
import {FormState, INITIAL_FORM_STATE} from "./constants";

interface Props extends ModalProps {
	projectId: string;
	projectRoleId: string;
}

const RequestProjectModal: FC<Props> = ({
	onClose,
	projectId,
	projectRoleId
}) => {
	const {showToast} = useToast();
	const [state, formAction] = useFormState<FormState>(createProjectRequest, {
		...INITIAL_FORM_STATE,
		projectId,
		projectRoleId
	});

	useEffect(() => {
		const handleStatus = () => {
			if (state.success) {
				onClose();
				showToast({variant: "success", message: "Request has been sent"});
			} else if (state.error) {
				showToast({variant: "error", message: state.error});
			}
		};

		handleStatus();
	}, [
		onClose,
		showToast,
		state.success,
		state.error,
		state.triggerStatusHandler
	]);

	return (
		<Modal isOpen onClose={onClose}>
			<ModalContent>
				{handleClose => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							Role request
						</ModalHeader>
						<ModalBody>
							<p>Are you sure you want to request role?</p>
						</ModalBody>
						<ModalFooter>
							<Button color="danger" variant="light" onPress={handleClose}>
								Cancel
							</Button>
							<form action={formAction}>
								<Button type="submit" color="primary">
									Request
								</Button>
							</form>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export type {Props as RequestProjectModalProps};
export default RequestProjectModal;
