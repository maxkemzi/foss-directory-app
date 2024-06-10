"use client";

import {Pathname} from "#src/shared/constants";
import {useAction} from "#src/shared/hooks";
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
import {FC, FormEvent} from "react";
import {leaveProject} from "./actions";

interface Props extends ModalProps {
	projectId: string;
}

const LeaveProjectModal: FC<Props> = ({onClose, projectId}) => {
	const router = useRouter();
	const {showToast} = useToast();

	const {execute, isPending} = useAction(leaveProject, {
		onSuccess: data => {
			router.push(Pathname.CHATS);
			router.refresh();
			showToast({variant: "success", message: data.success});
			onClose();
		},
		onError: data => {
			showToast({variant: "error", message: data.error});
		}
	});

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		execute(projectId);
	};

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
					<form onSubmit={handleSubmit}>
						<Button color="danger" isDisabled={isPending} type="submit">
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
