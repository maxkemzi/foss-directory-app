"use client";

import {useFormAction} from "#src/shared/hooks";
import {useModal} from "#src/shared/modal";
import {useToast} from "#src/shared/toast";
import {AlertModal, AlertModalProps, DropdownItemData} from "#src/shared/ui";
import {useRouter} from "next/navigation";
import {useCallback, useId} from "react";
import {deleteProject} from "../actions";
import DeleteProjectButton from "../components/DeleteProjectButton/DeleteProjectButton";
import {FormFields} from "../types";
import {VALIDATION_SCHEMA} from "../constants";

const useDeleteProjectDropdownItem = (projectId: string): DropdownItemData => {
	const id = useId();
	const router = useRouter();
	const {showToast} = useToast();
	const {openModal, closeModal} = useModal();

	const handleError = useCallback(
		() => showToast({variant: "error", message: "Error deleting the project"}),
		[showToast]
	);

	const {formAction} = useFormAction<FormFields>(deleteProject, {
		onSuccess: () => {
			closeModal();
			showToast({variant: "success", message: "You've deleted the project"});
			router.refresh();
		},
		onError: handleError,
		onValidationError: handleError,
		validationSchema: VALIDATION_SCHEMA
	});

	const action = () => {
		openModal<AlertModalProps>({
			component: AlertModal,
			props: {
				title: "Delete project",
				text: "Are you sure you want to delete the project?",
				submitButtonSlot: (
					<DeleteProjectButton projectId={projectId} action={formAction} />
				)
			}
		});
	};

	return {key: id, text: "Delete project", action, color: "danger"};
};

export default useDeleteProjectDropdownItem;
