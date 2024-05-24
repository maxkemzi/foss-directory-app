import {FC} from "react";

interface ModalProps {
	onClose: () => void;
}

interface ModalOptions<T> {
	component: FC<T>;
	props?: (Partial<ModalProps> & Omit<T, "onClose">) | {};
}

export type {ModalOptions, ModalProps};
