"use client";

import {useModal} from "#src/shared/modal";
import {AlertModal, AlertModalProps, DropdownItemData} from "#src/shared/ui";
import {useId} from "react";
import DeleteProjectButton from "./DeleteProjectButton";

const useDeleteProjectDropdownItem = (projectId: string): DropdownItemData => {
	const id = useId();
	const {openModal} = useModal();

	const action = () => {
		openModal<AlertModalProps>({
			component: AlertModal,
			props: {
				title: "Delete project",
				text: "Are you sure you want to delete the project?",
				submitButtonSlot: <DeleteProjectButton projectId={projectId} />
			}
		});
	};

	return {key: id, text: "Delete project", action, color: "danger"};
};

export {useDeleteProjectDropdownItem};
