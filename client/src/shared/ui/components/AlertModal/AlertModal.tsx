import {ModalProps} from "#src/shared/modal";
import {Button} from "@nextui-org/react";
import {FC, ReactNode} from "react";
import MyModal from "../MyModal/MyModal";

interface Props extends ModalProps {
	title: string;
	text: string;
	submitButtonSlot?: ReactNode;
	cancelButtonSlot?: ReactNode;
}

const AlertModal: FC<Props> = ({
	onClose,
	title,
	text,
	submitButtonSlot,
	cancelButtonSlot
}) => {
	return (
		<MyModal
			onClose={onClose}
			headerSlot={<h3>{title}</h3>}
			bodySlot={<p>{text}</p>}
			footerSlot={
				<>
					{cancelButtonSlot || <Button onPress={onClose}>Cancel</Button>}
					{submitButtonSlot}
				</>
			}
		/>
	);
};

export type {Props as AlertModalProps};
export default AlertModal;
