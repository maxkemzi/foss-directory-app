"use client";

import {useToast} from "#src/shared/toast";
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
import {FC, useEffect} from "react";
import {useFormState} from "react-dom";
import {getGithubConnectionUrlWithState} from "./actions";
import {INITIAL_FORM_STATE} from "./constants";

type Props = ModalProps;

const ConnectGithubModal: FC<Props> = ({onClose}) => {
	const router = useRouter();
	const {showToast} = useToast();
	const [state, formAction] = useFormState(
		getGithubConnectionUrlWithState,
		INITIAL_FORM_STATE
	);

	useEffect(() => {
		if (state.url) {
			router.push(state.url);
		} else if (state.error) {
			showToast({variant: "error", message: state.error});
		}
	}, [router, showToast, state.url, state.error, state.triggerStatusHandler]);

	return (
		<Modal isOpen onClose={onClose}>
			<ModalContent>
				{handleClose => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							Github Connection
						</ModalHeader>
						<ModalBody>
							<p>
								Connecting your Github account allows you to create projects.
							</p>
						</ModalBody>
						<ModalFooter>
							<Button color="danger" variant="light" onPress={handleClose}>
								Close
							</Button>
							<form action={formAction}>
								<Button type="submit" color="primary">
									Connect
								</Button>
							</form>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export type {Props as ConnectGithubModalProps};
export default ConnectGithubModal;
