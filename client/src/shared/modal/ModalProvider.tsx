"use client";

import {
	FC,
	PropsWithChildren,
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState
} from "react";
import {ModalOptions} from "./types";

const ModalContext = createContext<{
	openModal: <T>(opts: ModalOptions<T>) => void;
	closeModal: () => void;
}>({
	openModal: () => {},
	closeModal: () => {}
});

const ModalProvider: FC<PropsWithChildren> = ({children}) => {
	const [ModalComponent, setModalComponent] = useState<FC<any> | null>(null);
	const [modalProps, setModalProps] = useState<
		ModalOptions<any>["props"] | null
	>(null);

	const openModal = useCallback(
		<T,>({component, props = {}}: ModalOptions<T>) => {
			setModalComponent(() => component);
			setModalProps(props);
		},
		[]
	);

	const closeModal = useCallback(() => {
		setModalComponent(null);
		setModalProps(null);
	}, []);

	const value = useMemo(
		() => ({openModal, closeModal}),
		[closeModal, openModal]
	);

	return (
		<ModalContext.Provider value={value}>
			{children}
			{ModalComponent && modalProps ? (
				<ModalComponent onClose={closeModal} {...modalProps} />
			) : null}
		</ModalContext.Provider>
	);
};

const useModal = () => useContext(ModalContext);

export default ModalProvider;
export {useModal};
