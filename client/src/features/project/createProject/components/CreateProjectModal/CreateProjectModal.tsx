"use client";

import {Pathname} from "#src/shared/constants";
import {useFormAction} from "#src/shared/hooks";
import {ModalProps} from "#src/shared/modal";
import {useToast} from "#src/shared/toast";
import {SubmitButton} from "#src/shared/ui";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {FC, useRef} from "react";
import {FormFields} from "../../types";
import Fields from "./Fields/Fields";
import {createProjectWithData} from "../../actions";
import {VALIDATION_SCHEMA} from "../../constants";

type Props = ModalProps;

const CreateProjectModal: FC<Props> = ({onClose}) => {
	const router = useRouter();
	const formRef = useRef<HTMLFormElement>(null);
	const {showToast} = useToast();
	const {formAction, fieldErrors} = useFormAction<FormFields>(
		createProjectWithData,
		{
			onSuccess: () => {
				onClose();
				router.push(Pathname.MY_PROJECTS);
				showToast({variant: "success", message: "Project has been created"});
			},
			onError: () => {
				showToast({variant: "error", message: "Error creating project"});
			},
			validationSchema: VALIDATION_SCHEMA
		}
	);

	return (
		<Modal isOpen onClose={onClose} scrollBehavior="inside">
			<form ref={formRef} action={formAction}>
				<ModalContent>
					<ModalHeader>Project Creation</ModalHeader>
					<ModalBody>
						<Fields formRef={formRef} fieldErrors={fieldErrors} />
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
