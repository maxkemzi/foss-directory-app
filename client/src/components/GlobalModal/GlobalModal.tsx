"use client";

import {ModalVariant} from "#src/constants";
import {useRouter, useSearchParams} from "next/navigation";
import {FC} from "react";
import {GithubModal} from "../modals";

const GlobalModal: FC = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const modalIsVisible = searchParams.get("modal-visible") !== null;
	const modalVariant = searchParams.get("modal-variant");

	const handleClose = () => router.back();

	switch (modalVariant) {
		case ModalVariant.GITHUB:
			return <GithubModal isOpen={modalIsVisible} onClose={handleClose} />;
		default:
			return null;
	}
};

export default GlobalModal;
