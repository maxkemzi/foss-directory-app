"use client";

import {Pathname} from "#src/shared/constants";
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
import {FC, useEffect} from "react";
import {useFormState} from "react-dom";
import {leaveProject} from "./actions";
import {FormState, INITIAL_FORM_STATE} from "./constants";

interface Props extends ModalProps {
	projectId: string;
}

const LeaveProjectModal: FC<Props> = ({onClose, projectId}) => {
	const router = useRouter();
	const {showToast} = useToast();
	const [state, formAction] = useFormState<FormState>(leaveProject, {
		...INITIAL_FORM_STATE,
		projectId
	});

	useEffect(() => {
		if (state.success) {
			onClose();
			showToast({variant: "success", message: "You've left the project"});
			router.replace(Pathname.CHATS);
			router.refresh();
		} else if (state.error) {
			showToast({variant: "error", message: state.error});
		}
	}, [
		onClose,
		router,
		showToast,
		state.success,
		state.error,
		state.triggerStatusHandler
	]);

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
					</form>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export type {Props as LeaveProjectModalProps};
export default LeaveProjectModal;
