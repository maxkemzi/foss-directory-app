"use client";

import {SubmitButton} from "#src/components";
import {Pathname} from "#src/constants";
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
import {CustomModalProps} from "../types";
import FormFields from "./FormFields/FormFields";
import {createProjectAction} from "./FormFields/actions";
import {INITIAL_FORM_STATE} from "./FormFields/constants";

// TODO: split code into separate components
const CreateProjectModal: FC<CustomModalProps> = ({isOpen, onClose}) => {
	const router = useRouter();
	const [state, formAction] = useFormState(
		createProjectAction,
		INITIAL_FORM_STATE
	);

	useEffect(() => {
		if (state.success) {
			onClose();
			router.push(Pathname.MY_PROJECTS);
		}
	}, [onClose, router, state.success]);

	return (
		<Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
			<ModalContent action={formAction} as="form">
				{handleClose => (
					<>
						<ModalHeader>Project Creation</ModalHeader>
						<ModalBody>
							{state?.error ? (
								<div className="mb-4 text-danger">
									<p>{state.error}</p>
								</div>
							) : null}
							<FormFields state={state} />
						</ModalBody>
						<ModalFooter>
							<div className="flex gap-2 justify-end mt-6">
								<Button variant="light" onPress={handleClose}>
									Close
								</Button>
								<SubmitButton>Create</SubmitButton>
							</div>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default CreateProjectModal;
