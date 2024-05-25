import {useModal} from "#src/shared/modal";
import {DropdownItemData} from "#src/shared/ui";
import {useId} from "react";
import LeaveProjectModal, {
	LeaveProjectModalProps
} from "../components/LeaveProjectModal/LeaveProjectModal";

const useLeaveProjectDropdownItemData = (
	projectId: string
): DropdownItemData => {
	const id = useId();
	const {openModal} = useModal();

	const action = () => {
		openModal<LeaveProjectModalProps>({
			component: LeaveProjectModal,
			props: {projectId}
		});
	};

	return {key: id, text: "Leave project", action, color: "danger"};
};

export {useLeaveProjectDropdownItemData};
