"use client";

import {SubmitButton} from "#src/shared/ui";
import {useToast} from "#src/shared/toast";
import {Pathname} from "#src/shared/constants";
import {ModalProps} from "#src/shared/modal";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {FC, useEffect, useRef} from "react";
import {useFormState} from "react-dom";
import FormFields from "./FormFields/FormFields";
import {createProjectWithValidation} from "./FormFields/actions";
import {INITIAL_FORM_STATE} from "./FormFields/constants";

type Props = ModalProps;

const CreateProjectModal: FC<Props> = ({onClose}) => {
	const router = useRouter();
	const formRef = useRef<HTMLFormElement>(null);
	const {showToast} = useToast();
	const [state, formAction] = useFormState(
		createProjectWithValidation,
		INITIAL_FORM_STATE
	);

	useEffect(() => {
		if (state.success) {
			onClose();
			router.push(Pathname.MY_PROJECTS);
			showToast({variant: "success", message: "Project has been created."});
		} else if (state.error) {
			showToast({variant: "error", message: state.error});
		}
	}, [
		onClose,
		router,
		showToast,
		state.error,
		state.success,
		state.triggerStatusHandler
	]);

	return (
		<Modal isOpen onClose={onClose} scrollBehavior="inside">
			<form ref={formRef} action={formAction}>
				<ModalContent>
					<ModalHeader>Project Creation</ModalHeader>
					<ModalBody>
						<FormFields formRef={formRef} state={state} />
					</ModalBody>
					<ModalFooter>
						<div className="flex gap-2 justify-end mt-6">
							<Button variant="light" onClick={onClose} type="button">
								Close
							</Button>
							<SubmitButton>Create</SubmitButton>
						</div>
					</ModalFooter>
				</ModalContent>
			</form>
		</Modal>
	);
};

export type {Props as CreateProjectModalProps};
export default CreateProjectModal;
