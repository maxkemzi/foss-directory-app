"use client";

import {useFormAction} from "#src/shared/hooks";
import {ModalProps} from "#src/shared/modal";
import {useToast} from "#src/shared/toast";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {FC} from "react";
import {getGithubConnectionUrl} from "../actions";

type Props = ModalProps;

const ConnectGithubModal: FC<Props> = ({onClose}) => {
	const router = useRouter();
	const {showToast} = useToast();
	const {formAction} = useFormAction<void, string>(getGithubConnectionUrl, {
		onSuccess: url => {
			router.push(url);
		},
		onError: () => {
			showToast({variant: "error", message: "Error connecting github account"});
		}
	});

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
