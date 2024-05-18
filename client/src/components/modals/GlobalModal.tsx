"use client";

import {ModalVariant} from "#src/constants";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {FC} from "react";
import CreateProjectModal from "./CreateProjectModal/CreateProjectModal";
import DeleteAccountModal from "./DeleteAccountModal/DeleteAccountModal";
import GithubModal from "./GithubModal/GithubModal";
import LeaveProjectModal from "./LeaveProjectModal/LeaveProjectModal";
import ProjectRequestModal from "./ProjectRequestModal/ProjectRequestModal";
import {CustomModalProps} from "./types";

const GlobalModal = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const modal = searchParams.get("modal");

	const handleClose = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete("modal");

		router.replace(`${pathname}?${params.toString()}`);
	};

	const modalProps = {isOpen: true, onClose: handleClose};

	let ModalComponent: FC<CustomModalProps> | undefined;

	if (modal === ModalVariant.GITHUB) {
		ModalComponent = GithubModal;
	} else if (modal === ModalVariant.DELETE_ACCOUNT) {
		ModalComponent = DeleteAccountModal;
	} else if (modal === ModalVariant.CREATE_PROJECT) {
		ModalComponent = CreateProjectModal;
	} else if (modal === ModalVariant.PROJECT_REQUEST) {
		ModalComponent = ProjectRequestModal;
	} else if (modal === ModalVariant.LEAVE_PROJECT) {
		ModalComponent = LeaveProjectModal;
	}

	return ModalComponent ? <ModalComponent {...modalProps} /> : null;
};

export default GlobalModal;
